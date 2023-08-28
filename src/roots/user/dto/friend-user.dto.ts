import { IsNumber, Validate } from 'class-validator';
import { IsPostgresBigInt } from './bigInt.constraint';
import { ApiProperty } from '@nestjs/swagger';
export class FriendUserDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  id: number;

  @ApiProperty()
  @Validate(IsPostgresBigInt)
  friendId: number;
}
