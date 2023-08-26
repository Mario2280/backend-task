import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Comment } from 'src/user/models/comment.model';
import { Task } from 'src/user/models/task.model';
import { Account } from 'src/user/models/user.model';
export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Account, Task, Comment],
    synchronize: true,
  }),
  imports: [ConfigModule],
  inject: [ConfigService],
  //dataSourceFactory: async (options) => new DataSource(options).initialize(),
});
