import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  providers: [AuthService],
})
export class AuthModule {}
