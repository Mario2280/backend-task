import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from '../task/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addComment(publisherId: number, commentText: string, taskId: number) {
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
