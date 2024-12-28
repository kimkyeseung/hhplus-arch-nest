import { Injectable, Inject } from '@nestjs/common';
import { Lecture } from '../../domain/lecture/lecture.entity';
import { LectureRepository } from '../../domain/lecture/lecture.repository';
import { LECTURE_REPOSITORY } from '../../domain/lecture/lecture.constants';
import { Mutex } from 'async-mutex';

@Injectable()
export class LectureService {
  private readonly lectureMutexes = new Map<number, Mutex>();

  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
  ) {}

  async createLecture(
    title: string,
    instructorName: string,
    date: Date,
  ): Promise<Lecture> {
    const lecture = new Lecture(Date.now(), title, instructorName, date);
    await this.lectureRepository.save(lecture);
    return lecture;
  }

  async getLectureById(id: number): Promise<Lecture | null> {
    return this.lectureRepository.findById(id);
  }

  async getLecturesByDate(date: Date): Promise<Lecture[]> {
    return this.lectureRepository.findByDate(date);
  }

  private getMutex(lectureId: number): Mutex {
    if (!this.lectureMutexes.has(lectureId)) {
      this.lectureMutexes.set(lectureId, new Mutex());
    }
    return this.lectureMutexes.get(lectureId)!;
  }

  async registerParticipant(lectureId: number, userId: number): Promise<void> {
    const mutex = this.getMutex(lectureId);

    await mutex.runExclusive(async () => {
      const lecture = await this.lectureRepository.findById(lectureId);
      if (!lecture) {
        throw new Error('Lecture not found');
      }

      lecture.addParticipant(userId);
      await this.lectureRepository.save(lecture);
    });
  }

  async getAvailableLectures(date: Date): Promise<Lecture[]> {
    const lectures = await this.getLecturesByDate(date);
    return lectures.filter((lecture) => !lecture.isFull());
  }

  async getCompletedLectures(userId: number): Promise<Lecture[]> {
    const lectures = await this.lectureRepository.findAll();
    return lectures.filter((lecture) => lecture.participants.includes(userId));
  }
}
