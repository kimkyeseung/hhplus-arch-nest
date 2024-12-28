import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'lecture_service',
  synchronize: true,
  autoLoadEntities: true,
};

export const typeOrmTestConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  autoLoadEntities: true,
};
