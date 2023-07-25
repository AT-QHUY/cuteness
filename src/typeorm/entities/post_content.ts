import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './post';

@Entity()
export class PostContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @ManyToOne(() => Posts, (post) => post.post_content)
  @JoinColumn({ name: 'post_id' })
  post_id: number;
}
