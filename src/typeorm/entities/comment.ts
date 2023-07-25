import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './post';
import { User } from './user';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  create_by: User;

  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @ManyToOne(() => Comment, (Comment) => Comment.childComments)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Comment;

  @OneToMany(() => Comment, (Comment) => Comment.parentComment)
  childComments: Comment[];
}
