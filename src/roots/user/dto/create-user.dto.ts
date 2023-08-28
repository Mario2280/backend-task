import { IsNotEmpty, MinLength } from 'class-validator';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}
