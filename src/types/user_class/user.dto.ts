import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Comment } from 'src/typeorm/entities/comment';
import { Posts } from 'src/typeorm/entities/post';
import { Reaction } from 'src/typeorm/entities/reaction';
import { Role } from 'src/typeorm/entities/role_type';
import { StatusType } from 'src/typeorm/entities/status_type';
import { Gender } from './user.type';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  address: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class GetUserDto {
  @Expose()
  user_id: number;

  @Expose()
  email: string;

  password: string;

  @Expose()
  avatar: string;

  @Expose()
  name: string;

  @Expose()
  date_of_birth: Date;

  @Expose()
  gender: string;

  access_token: string;

  refresh_token: string;

  @Expose()
  address: string;

  create_at: Date;

  status: StatusType;

  role: Role;

  posts: Posts[];

  comments: Comment[];

  user_reactions: Reaction[];

  @Transform(({ obj }) => obj.status?.code)
  status_code: string;

  @Transform(({ obj }) => obj.role?.code)
  @Expose()
  role_code: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsEnum(['Male', 'Female'])
  gender: string;

  @IsNotEmpty()
  address: string;
}

export class UpdateUserAvatarDto {
  @IsNotEmpty()
  avatar: string;
}

export class SearchUserByNameDto {
  @IsString()
  name: string;
}
