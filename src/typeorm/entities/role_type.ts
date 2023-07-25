import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'role_type' })
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  code: String;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
