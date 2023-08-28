import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Validate } from 'class-validator';
import { IsPostgresBigInt } from './bigInt.constraint';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsNumber()
  @Validate(IsPostgresBigInt)
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  newEmail?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string;
}
