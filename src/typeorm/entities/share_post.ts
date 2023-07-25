import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Posts } from './post';
import { User } from './user';

@Entity()
@Unique(['user_id', 'post_id'])
export class Share_Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at: Date;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => User, (user) => user.user_id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Posts, (post) => post.post_id, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post: Posts;
}
