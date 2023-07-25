import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Comment } from './comment';
import { PostContent } from './post_content';
import { PostStatusType } from './post_status_type';
import { Reaction } from './reaction';
import { User } from './user';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar', length: 5000 })
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  update_at: Date;

  @ManyToOne(() => PostStatusType, (post_status) => post_status.post)
  @JoinColumn({ name: 'post_status_id' })
  status: PostStatusType;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'user_id' })
  create_by: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  post_reactions: Reaction[];

  @OneToMany(() => PostContent, (postContent) => postContent.post_id, {
    eager: true,
  })
  post_content: PostContent[];

  @ManyToMany(() => Category, (category) => category.posts, { cascade: true })
  @JoinTable({
    name: 'posts_categories',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'post_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'category_id',
    },
  })
  categories: Category[];
}
