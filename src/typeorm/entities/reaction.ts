import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './post';
import { User } from './user';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @CreateDateColumn()
  create_at: Date;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Posts, (post) => post.post_id)
  @JoinColumn({ name: 'post_id' })
  post: Posts;
}
