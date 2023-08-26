import { IsEmail, IsNumber } from 'class-validator';

export class RemoveUserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  userId: number;
}
