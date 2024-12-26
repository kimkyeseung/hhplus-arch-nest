import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './infrastructure/http/lecture.controller';
import { AppService } from './app.service';
import { LectureService } from './application/lecture/lecture.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { typeOrmTestConfig } from './infrastructure/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmTestConfig), DatabaseModule],
  controllers: [AppController, LectureController],
  providers: [AppService, LectureService],
})
export class AppModule {}
