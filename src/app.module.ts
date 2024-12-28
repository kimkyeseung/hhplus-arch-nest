import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureController } from './infrastructure/http/lecture.controller';
import { LectureService } from './application/lecture/lecture.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import {
  databaseConfig,
  typeOrmTestConfig,
} from './infrastructure/config/typeorm.config';

const typeOrmConfig =
  process.env.NODE_ENV === 'test' ? typeOrmTestConfig : databaseConfig;

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DatabaseModule],
  controllers: [AppController, LectureController],
  providers: [AppService, LectureService],
})
export class AppModule {}
