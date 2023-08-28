import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { IsPostgresBigInt } from 'src/user/dto/bigInt.constraint';

export class CreateCommentDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  publisherId: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  taskId: number;
}
