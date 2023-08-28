import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'char', length: 20, unique: true })
  username: string;

  @Column('varchar')
  passwordHash: string;

  @Column({ type: 'bigint', array: true, nullable: true, default: [] })
  friends: number[];

  @Column('int8', { default: 0 })
  rating: number;

  @OneToMany(() => Task, (task) => task.account, { cascade: true, eager: true })
  listOfGoodDeeds: Task[];
}
