import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.model';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'char', length: 20, unique: true })
  username: string;

  @Column('varchar')
  passwordHash: string;

  @Column({ type: 'bigint', array: true, nullable: true })
  friends: number[];

  @Column('int8', { default: 0 })
  rating: number;

  @OneToMany(() => Task, (task) => task.account, { cascade: true, eager: true })
  listOfGoodDeeds: Task[];

  //constructor(
  //  email: string,
  //  username: string,
  //  passwordHash: string,
  //  friends: number[] | null = null,
  //  rating: number = 0,
  //  listOfGoodDeeds: Task[],
  //) {
  //  this.email = email;
  //  this.username = username;
  //  this.passwordHash = passwordHash;
  //  this.friends = friends;
  //  this.rating = rating;
  //  this.listOfGoodDeeds = listOfGoodDeeds;
  //}

  addTask(task: Task) {
    this.listOfGoodDeeds.push(task);
  }

  incrementRating(value: number) {
    this.rating += value;
  }
}
