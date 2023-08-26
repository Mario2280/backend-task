import { IsEmail, IsNumber } from 'class-validator';

export class FriendUserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  friendId: number;
}
