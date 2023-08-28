import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('bool')
  isCompleted: boolean;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (users) => users.listOfGoodDeeds, {
    onDelete: 'SET NULL',
  })
  account: User;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  comments: Comment[];
}
