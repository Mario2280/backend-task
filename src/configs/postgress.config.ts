import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Comment } from '../roots/comment/entities/comment.entity';
import { Task } from '../roots/task/entities/task.entity';
import { User } from '../roots/user/entities/user.entity';
export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    entities: [User, Task, Comment],
    synchronize: true,
  }),
  imports: [ConfigModule],
  inject: [ConfigService],
  //dataSourceFactory: async (options) => new DataSource(options).initialize(),
});
