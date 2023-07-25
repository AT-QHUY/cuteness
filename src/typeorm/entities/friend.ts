import { FriendStatus } from 'src/types/friend/friend';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'friend' })
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at: Date;

  @Column({
    type: 'enum',
    enum: FriendStatus,
    default: 'active',
  })
  status: FriendStatus;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}
