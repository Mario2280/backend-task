import { IsNumber, Validate } from 'class-validator';
import { IsPostgresBigInt } from '../../user/dto/bigInt.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class TaskUserDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  taskId: number;
}
