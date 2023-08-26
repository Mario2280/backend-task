import { IsNotEmpty, MinLength } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}
