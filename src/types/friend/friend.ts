import { User } from 'src/typeorm/entities/user';

export type CreateFriendParam = {
  user: User;
  follower_id: number;
};

export enum FriendStatus {
  Active = 'active',
  Inactive = 'inactive',
}
