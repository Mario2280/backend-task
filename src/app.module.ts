import { Module } from '@nestjs/common';
import { UserModule } from './roots/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgress.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './roots/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from './configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './roots/task/task.module';
import { CommentModule } from './roots/comment/comment.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(getPostgresConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    TaskModule,
    CommentModule,
  ],
})
export class AppModule {}
