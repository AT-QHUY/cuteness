import { Posts } from 'src/typeorm/entities/post';
import { User } from 'src/typeorm/entities/user';

export type createPostParam = {
  title: string;
  create_by: User;
};

export type createPostContentParam = {
  content: string;
  post_id: number;
};

export type createSharePostParam = {
  user: User;
  post_id: number;
};
