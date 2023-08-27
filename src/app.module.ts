import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgress.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from './configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';

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
  ],
})
export class AppModule {}
