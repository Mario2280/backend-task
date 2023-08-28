import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async setCompletedTask(userId: number, taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    await this.userRepository.increment({ id: userId }, 'rating', 10);
    task.isCompleted = true;
    await this.taskRepository.save(task);
  }

  async addTask(userId: number, description: string) {
    const account = await this.userRepository.findOne({
      where: { id: userId },
    });
    const task = this.taskRepository.create({ description, account });
    account.listOfGoodDeeds.push(task);
    await this.taskRepository.save(task);
    return await this.userRepository.save(account);
  }
  async removeTask(taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    return await this.taskRepository.remove(task);
  }
  async updateTask(description: string, taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    task.description = description;
    return await this.taskRepository.save(task);
  }
}
