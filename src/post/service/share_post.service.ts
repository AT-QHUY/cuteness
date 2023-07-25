import { plainToInstance } from 'class-transformer';
import { GetPostDto } from './../../types/post_types/post.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { Share_Post } from 'src/typeorm/entities/share_post';
import { createSharePostParam } from 'src/types/post_types/post.type';
import { In, Repository } from 'typeorm';
import { UnableToCreateException } from 'src/exception/not_modified.exception';
@Injectable()
export class SharePostService {
  constructor(
    @InjectRepository(Share_Post)
    private sharePostRepository: Repository<Share_Post>,
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async getAllSharePost() {}

  async createSharePost({ user, post_id }: createSharePostParam) {
    try {
      const post: Posts = await this.postRepository.findOne({
        where: {
          post_id,
        },
      });

      if (!post) throw new UnableToCreateException();

      var sharePost = this.sharePostRepository.create({ user: user, post });

      await this.sharePostRepository.save(sharePost);
    } catch (error) {
      throw new UnableToCreateException();
    }
  }

  async getSharedPostByUserId(user_id: number): Promise<GetPostDto[]> {
    const sharedPosts: Share_Post[] = await this.sharePostRepository.find({
      where: {
        user: { user_id },
      },
    });

    const ids = sharedPosts.map((item) => item.post.post_id);

    const posts: Posts[] = await this.postRepository.findBy({
      post_id: In(ids),
    });

    return plainToInstance(GetPostDto, posts, {
      excludeExtraneousValues: true,
    });
  }
}
