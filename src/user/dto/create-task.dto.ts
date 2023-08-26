import { IsEmail, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsEmail()
  email: string;

  @IsString()
  description: string;
}
