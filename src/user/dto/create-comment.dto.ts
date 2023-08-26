import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  publisherId: number;

  @IsString()
  description: string;

  @IsUUID()
  taskId: string;
}
