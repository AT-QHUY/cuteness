import { type } from 'os';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  JoinTable,
} from 'typeorm';
import { Comment } from './comment';
import { Posts } from './post';
import { Reaction } from './reaction';
import { Role } from './role_type';
import { StatusType } from './status_type';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    default:
      'https://cdn.dribbble.com/userupload/2808088/file/original-37e722e6bdc3275d5fcee763ce5d4261.png?compress=1&resize=1024x768',
  })
  avatar: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({
    type: 'enum',
    enum: ['Male', 'Female'],
    default: 'Male',
  })
  gender: string;

  @Column({ nullable: true, name: 'access_token' })
  access_token: string;

  @Column({ nullable: true, name: 'refresh_token' })
  refresh_token: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;

  @ManyToOne(() => StatusType, (status) => status.users, { eager: true })
  @JoinColumn({ name: 'status_id' })
  status: StatusType;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Posts, (post) => post.create_by)
  posts: Posts[];

  @OneToMany(() => Comment, (comment) => comment.create_by)
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  user_reactions: Reaction[];
}
