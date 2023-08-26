import { IsUUID } from 'class-validator';

export class DeleteTaskDto {
  @IsUUID()
  taskId: string;
}
