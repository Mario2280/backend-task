import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() createUserDto: LoginUserDto) {
    const { email, username, id } = await this.authService.validateUser(
      createUserDto.email,
      createUserDto.password,
    );
    return this.authService.login(email, username, id);
  }

  @Post('getUser')
  async getUser(@Body() body: any) {
    return await this.authService.getUser(body.jwt);
  }
}
