import { IsString, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsUUID()
  taskId: string;

  @IsString()
  description: string;
}
