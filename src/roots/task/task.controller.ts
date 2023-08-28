import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JWTAuthGuard } from '../user/guards/jwt.guard';
import { Request } from 'express';
import { IJWTPayload } from '../user/strategies/jwt.strategy';
import { TaskUserDto } from './dto/task-status-update-user.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('setTaskCompleted')
  async setTaskCompleted(@Query() params: TaskUserDto, @Req() req: Request) {
    return await this.taskService.setCompletedTask(
      +(req.user as IJWTPayload).id,
      +params.taskId,
    );
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addTask')
  async addTask(@Body() params: CreateTaskDto, @Req() req: Request) {
    return await this.taskService.addTask(
      +(req.user as IJWTPayload).id,
      params.description,
    );
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeTask')
  async removeTask(@Query() { taskId }: DeleteTaskDto) {
    return await this.taskService.removeTask(taskId);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('updateTask')
  async updateTask(@Body() { taskId, description }: UpdateTaskDto) {
    return await this.taskService.updateTask(description, taskId);
  }
}
