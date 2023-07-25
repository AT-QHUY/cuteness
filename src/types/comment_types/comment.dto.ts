import { GetUserDto } from './../user_class/user.dto';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { Posts } from 'src/typeorm/entities/post';
import { User } from 'src/typeorm/entities/user';

export class GetCommentDto {
  @Expose()
  comment_id: number;

  @Expose()
  content: string;

  @Expose()
  create_at: Date;

  @Expose()
  @Type(() => GetUserDto)
  @Transform(({ obj }) =>
    plainToInstance(GetUserDto, obj?.create_by, {
      excludeExtraneousValues: true,
    }),
  )
  user: GetUserDto;

  create_by: User;

  post: Posts;

  parentComment: Comment;

  childComments: Comment[];
}
