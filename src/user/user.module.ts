import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './models/user.model';
import { Task } from './models/task.model';
import { Comment } from './models/comment.model';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Task, Comment])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, Repository<Task>, Repository<Account>],
  exports: [TypeOrmModule.forFeature([Account])],
})
export class UserModule {}
