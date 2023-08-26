import {
  Controller,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from './guards/jwt.guard';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendUserDto } from './dto/friend-user.dto';
import { TaskUserDto } from './dto/task-status-update-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeUser')
  async removeUser(@Body() { email, userId }: RemoveUserDto) {
    return await this.userService.removeAccount(email, userId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto.id, {
      email: updateUserDto.newEmail,
      password: updateUserDto.password,
      username: updateUserDto.username,
    });
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addFriend')
  async addFriend(@Body() { email, friendId }: FriendUserDto) {
    return await this.userService.addFriend(email, friendId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeFriend')
  async removeFriend(@Body() { email, friendId }: FriendUserDto) {
    return await this.userService.removeFriend(email, friendId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('setTaskCompleted')
  async setTaskCompleted(@Body() { email, taskId }: TaskUserDto) {
    return await this.userService.setCompletedTask(email, taskId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addTask')
  async addTask(@Body() { email, description }: CreateTaskDto) {
    return await this.userService.addTask(email, description);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeTask')
  async removeTask(@Body() { taskId }: DeleteTaskDto) {
    return await this.userService.removeTask(taskId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('updateTask')
  async updateTask(@Body() { taskId, description }: UpdateTaskDto) {
    return await this.userService.updateTask(description, taskId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addComment')
  async addComment(
    @Body() { taskId, description, publisherId }: CreateCommentDto,
  ) {
    return await this.userService.addComment(publisherId, description, taskId);
  }
}
