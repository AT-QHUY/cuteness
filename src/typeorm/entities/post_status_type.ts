import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './post';

@Entity()
export class PostStatusType {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => Posts, (post) => post.status)
  post: Posts[];
}
