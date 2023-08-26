import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './user.model';
import { Comment } from './comment.model';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bool')
  isCompleted: boolean;

  @Column('text')
  description: string;

  @ManyToOne(() => Account, (users) => users.listOfGoodDeeds, {
    onDelete: 'SET NULL',
  })
  account: Account;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  comments: Comment[];

  setCompleted() {
    this.isCompleted = true;
  }
}
