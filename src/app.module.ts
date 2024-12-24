import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LectureController } from './infrastructure/http/lecture.controller';
import { AppService } from './app.service';
import { LectureService } from './application/lecture/lecture.service';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, LectureController],
  providers: [AppService, LectureService],
})
export class AppModule {}
