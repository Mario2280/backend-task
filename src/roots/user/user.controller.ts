import {
  Controller,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from './guards/jwt.guard';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendUserDto } from './dto/friend-user.dto';
import { IJWTPayload } from './strategies/jwt.strategy';

import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeUser')
  async removeUser(@Body() { id }: RemoveUserDto) {
    return await this.userService.removeAccount(id);
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return await this.userService.updateUser(+(req.user as IJWTPayload).id, {
      email: updateUserDto.newEmail,
      password: updateUserDto.password,
      username: updateUserDto.username,
    });
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addFriend')
  async addFriend(@Body() { friendId }: FriendUserDto, @Req() req: Request) {
    return await this.userService.addFriend(
      +(req.user as IJWTPayload).id,
      friendId,
    );
  }

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('removeFriend')
  async removeFriend(@Body() { friendId }: FriendUserDto, @Req() req: Request) {
    return await this.userService.removeFriend(
      +(req.user as IJWTPayload).id,
      friendId,
    );
  }

  //@UseGuards(JWTAuthGuard)
  ////@UsePipes(new ValidationPipe())
  //@Post('addComment')
  //async addComment(
  //  @Body() { taskId, description, publisherId }: CreateCommentDto,
  //  @TokenPayload() token: string,
  //) {
  //  console.log(token);

  //  //return await this.userService.addComment(publisherId, description, taskId);
  //}
}
