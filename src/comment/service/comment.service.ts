import { plainToInstance } from 'class-transformer';
import { CreateCommentParam } from './../../types/comment_types/comment.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/comment';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { GetCommentDto } from 'src/types/comment_types/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async getByPostId(post_id: number): Promise<GetCommentDto[]> {
    const comments: Comment[] = await this.commentRepository.find({
      where: {
        post: {
          post_id,
        },
      },
    });

    const newComments: GetCommentDto[] = comments.map((comment) =>
      plainToInstance(GetCommentDto, comment, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
    );

    return newComments;
  }

  async createComment(
    user: User,
    post_id: number,
    createPostContentParam: CreateCommentParam,
  ): Promise<number> {
    let comment = this.commentRepository.create({
      content: createPostContentParam.content,
      post: {
        post_id,
      },
      create_by: user,
    });

    await this.commentRepository.save(comment);

    return comment.comment_id;
  }
}
