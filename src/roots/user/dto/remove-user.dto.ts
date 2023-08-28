import { IsNumber, Validate } from 'class-validator';
import { IsPostgresBigInt } from './bigInt.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  id: number;
}
