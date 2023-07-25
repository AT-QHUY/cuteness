import { Category } from './../../typeorm/entities/category';
import { CategoryService } from './../../category/service/category.service';
import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UnableToCreateException } from 'src/exception/not_modified.exception';
import { NotFoundException } from 'src/exception/no_content.exception';
import { Posts } from 'src/typeorm/entities/post';
import { User } from 'src/typeorm/entities/user';
import {
  CreatePostDto,
  GetPostByUserId,
  GetPostDto,
  GetPostWithCommentDto,
} from 'src/types/post_types/post.dto';
import { createPostParam } from 'src/types/post_types/post.type';
import { DataSource, Repository, Like } from 'typeorm';
import { PostContentService } from './post_content.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    private readonly postContentService: PostContentService,
    private readonly categoryService: CategoryService,
    private readonly datasource: DataSource,
  ) {}

  async getAllPosts(): Promise<GetPostDto[]> {
    const posts: Posts[] = await this.postRepository.find({
      relations: {
        post_reactions: true,
      },
    });

    const newPosts = posts.map((post) =>
      plainToInstance(GetPostDto, post, {
        excludeExtraneousValues: true,
      }),
    );

    return newPosts;
  }

  async getOnePost(post_id: number): Promise<GetPostWithCommentDto> {
    const post = await this.postRepository.findOne({
      where: {
        post_id: post_id,
      },
      relations: {
        comments: true,
        post_reactions: true,
      },
    });

    if (!post) throw new NotFoundException();

    return plainToInstance(GetPostWithCommentDto, post, {
      excludeExtraneousValues: true,
    });
  }

  async createPost(createPostDto: CreatePostDto, create_by: User) {
    const createPostParam: createPostParam = {
      title: createPostDto.title,
      create_by: create_by,
    };

    var categories: Category[] = await this.categoryService.getById(
      createPostDto.category,
    );

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let newPost = this.postRepository.create(createPostParam);
      newPost.categories = categories;

      await this.postRepository.save(newPost);

      await this.postContentService.createPostContent(
        createPostDto.content,
        newPost.post_id,
      );

      return newPost.post_id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new UnableToCreateException();
    } finally {
      await queryRunner.release();
    }
  }

  async getPostByUserId(user_id: number): Promise<GetPostByUserId[]> {
    var posts: Posts[] = await this.postRepository.find({
      where: {
        create_by: {
          user_id,
        },
      },
    });

    const newPosts: GetPostByUserId[] = posts.map((post) =>
      plainToInstance(GetPostByUserId, post, {
        excludeExtraneousValues: true,
      }),
    );

    return newPosts;
  }

  async searchByTitle(title: string): Promise<GetPostDto[]> {
    if (title == '') return [];

    var posts: Posts[] = await this.postRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });

    const newPosts: GetPostDto[] = posts.map((post) =>
      plainToInstance(GetPostDto, post, {
        excludeExtraneousValues: true,
      }),
    );

    return newPosts;
  }

  // async updatePostById(
  //   post_id: number,
  //   { content, title }: UpdatePostDto,
  //   tmpUser: User,
  // ): Promise<GetPostDto> {
  //   const post = await this.postRepository.findOne({
  //     relations: ['create_by'],
  //     where: {
  //       post_id,
  //       create_by: {
  //         user_id: tmpUser.user_id,
  //       },
  //     },
  //   });

  //   if (!post) throw new HttpException('Not found', HttpStatus.NO_CONTENT);
  //   post.title = title;

  //   const updatedPost = await this.postRepository.save(post);

  //   return plainToInstance(GetPostDto, updatedPost, {
  //     excludeExtraneousValues: true,
  //   });
  // }

  // async updatePostById(
  //   post_id: number,
  //   updatePostDto: UpdatePostDto,
  //   tmpUser: User,
  // ): Promise<boolean> {
  //   const post = await this.dataSource
  //     .createQueryBuilder()
  //     .update(Posts)
  //     .set({
  //       ...updatePostDto,
  //     })
  //     .where('post_id = :post_id and user_id = :user_id', {
  //       post_id,
  //       user_id: tmpUser.user_id,
  //     })
  //     .execute();

  //   if (post.affected == 1) {
  //     return true;
  //   }
  //   return false;
  // }
}
