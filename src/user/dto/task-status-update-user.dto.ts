import { IsEmail, IsString } from 'class-validator';

export class TaskUserDto {
  @IsEmail()
  email: string;

  @IsString()
  taskId: string;
}
