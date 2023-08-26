import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.model';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 20 })
  username: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'SET NULL',
  })
  task: Task;
}
