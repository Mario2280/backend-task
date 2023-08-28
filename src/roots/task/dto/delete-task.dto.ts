import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Validate } from 'class-validator';
import { IsPostgresBigInt } from '../../user/dto/bigInt.constraint';

export class DeleteTaskDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  taskId: number;
}
