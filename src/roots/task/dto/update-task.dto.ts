import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { IsPostgresBigInt } from '../../user/dto/bigInt.constraint';

export class UpdateTaskDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  taskId: number;

  @ApiProperty()
  @IsString()
  description: string;
}
