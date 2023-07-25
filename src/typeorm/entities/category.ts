import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './post';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  code: string;

  @ManyToMany(() => Posts, (post) => post.categories)
  posts: Posts[];
}
