import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Task } from './models/task.model';
import { Comment } from './models/comment.model';

interface UpdateUserDto {
  email?: string;
  username?: string;
  password?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<Account>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async removeAccount(email: string, userId: number) {
    await this.userRepository.query(
      `update account set friends = array_remove(friends, $1)`,
      [userId],
    );
    await this.userRepository.delete({ email });
  }

  async updateUser(id: number, props: UpdateUserDto) {
    const condidate = await this.userRepository.findOne({ where: { id } });

    if (!condidate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (props.email) {
      const emailAlreadyTaken = await this.userRepository.exist({
        where: { email: props.email },
      });
      if (emailAlreadyTaken)
        throw new HttpException(
          'User with email already exists',
          HttpStatus.CONFLICT,
        );
      condidate.email = props.email;
    }
    if (props.username) {
      const nameAlreadyTaken = await this.userRepository.exist({
        where: { username: props.username },
      });
      if (nameAlreadyTaken)
        throw new HttpException(
          'User with username already exists',
          HttpStatus.CONFLICT,
        );
      condidate.username = props.username;
    }
    if (props.password) {
      const salt = await genSalt(10);
      const passwordHash = await hash(props.password, salt);
      condidate.passwordHash = passwordHash;
    }
    await this.userRepository.save(condidate);
  }

  async removeFriend(email: string, friendId: number) {
    const user = await this.userRepository.findOne({ where: { email } });
    user.friends = user.friends.filter((id) => id !== friendId);
    await this.userRepository.save(user);
  }

  async addFriend(email: string, friendId: number) {
    const user = await this.userRepository.findOne({ where: { email } });
    user.friends.push(friendId);
    await this.userRepository.save(user);
  }

  async setCompletedTask(email: string, taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    task.setCompleted();

    task.account.incrementRating(10);

    await this.taskRepository.save(task);
    await this.userRepository.save(task.account);
    //const account = await this.userRepository.findOne({
    //  where: { email: email },
    //});

    //account.incrementRating(10);

    //return await this.userRepository.save(account);

    //await this.userRepository.increment({ email }, 'rating', 10);
  }

  async addTask(email: string, description: string) {
    const account = await this.userRepository.findOne({
      where: { email: email },
    });

    const task = this.taskRepository.create({ description, account });
    account.addTask(task);
    await this.taskRepository.save(task);
    return await this.userRepository.save(account);
  }

  async removeTask(taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    return await this.taskRepository.remove(task);
  }

  async updateTask(description: string, taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    task.description = description;
    return await this.taskRepository.save(task);
  }

  async addComment(publisherId: number, commentText: string, taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    const publisher = await this.userRepository.findOne({
      where: { id: publisherId },
    });
    if (!publisher.friends.includes(task.account.id))
      throw new HttpException(
        'Можно добавлять комментарии только у друзей',
        HttpStatus.METHOD_NOT_ALLOWED,
      );

    const newComment = this.commentRepository.create();
    newComment.description = commentText;
    newComment.task = task;
    newComment.username = publisher.username;
    return await this.commentRepository.save(newComment);
  }
}
