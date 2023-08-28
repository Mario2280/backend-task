import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'char', length: 20 })
  username: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'SET NULL',
  })
  task: Task;
}
