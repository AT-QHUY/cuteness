import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'status_type' })
export class StatusType {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ unique: true })
  code: String;

  @OneToMany(() => User, (user) => user.status)
  users: User[];
}
