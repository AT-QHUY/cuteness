import { GetCommentDto } from 'src/types/comment_types/comment.dto';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/typeorm/entities/category';
import { Comment } from 'src/typeorm/entities/comment';
import { PostContent } from 'src/typeorm/entities/post_content';
import { PostStatusType } from 'src/typeorm/entities/post_status_type';
import { Reaction } from 'src/typeorm/entities/reaction';
import { User } from '../../typeorm/entities/user';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  content: string[];

  category: number[];
}

export class UpdatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

export class GetPostDto {
  @Expose()
  title: string;

  @Expose()
  create_at: Date;

  @Expose()
  update_at: Date;

  create_by: User;
  status: PostStatusType;
  comments: Comment[];
  categories: Category[];

  @Expose()
  // @Type(() => PostContent)
  @Transform(({ obj }) => obj.post_content)
  post_content: PostContent[];

  @Expose()
  @Transform(({ obj }) => obj?.post_reactions)
  post_reactions: Reaction[];

  @Expose()
  post_id: number;

  @Transform(({ obj }) => obj.create_by?.user_id)
  @Expose()
  user_id: number;

  @Transform(({ obj }) => obj.create_by?.name)
  @Expose()
  username: string;

  @Transform(({ obj }) => obj.create_by?.avatar)
  @Expose()
  avatar: string;
}

export class GetPostWithCommentDto {
  @Expose()
  title: string;

  @Expose()
  create_at: Date;

  @Expose()
  update_at: Date;

  create_by: User;
  status: PostStatusType;

  @Expose()
  @Type(() => GetCommentDto)
  @Transform(({ obj }) =>
    plainToInstance(GetCommentDto, obj?.comments, {
      excludeExtraneousValues: true,
    }),
  )
  comments: GetCommentDto[];

  categories: Category[];

  @Expose()
  // @Type(() => PostContent)
  @Transform(({ obj }) => obj.post_content)
  post_content: PostContent[];

  post_reactions: Reaction[];

  @Expose()
  post_id: number;

  @Transform(({ obj }) => obj.create_by?.user_id)
  @Expose()
  user_id: number;

  @Transform(({ obj }) => obj.create_by?.name)
  @Expose()
  username: string;

  @Transform(({ obj }) => obj.create_by?.avatar)
  @Expose()
  avatar: string;
}

export class GetPostByUserId {
  title: string;

  create_at: Date;

  update_at: Date;

  create_by: User;
  status: PostStatusType;
  comments: Comment[];
  categories: Category[];

  @Expose()
  // @Type(() => PostContent)
  @Transform(({ obj }) => obj.post_content)
  post_content: PostContent[];

  post_reactions: Reaction[];

  @Expose()
  post_id: number;

  @Transform(({ obj }) => obj.create_by?.user_id)
  @Expose()
  user_id: number;

  username: string;

  avatar: string;
}
