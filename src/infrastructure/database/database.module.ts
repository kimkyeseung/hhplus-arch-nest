import { Module } from '@nestjs/common';
import { LectureRepositoryImpl } from './lecture.repository.impl';
import { LECTURE_REPOSITORY } from '../../domain/lecture/lecture.constants';

@Module({
  providers: [{ provide: LECTURE_REPOSITORY, useClass: LectureRepositoryImpl }],
  exports: [LECTURE_REPOSITORY],
})
export class DatabaseModule {}
