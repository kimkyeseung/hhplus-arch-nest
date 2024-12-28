import { Lecture } from '../../domain/lecture/lecture.entity';
import { LectureRepository } from '../../domain/lecture/lecture.repository';

export class LectureRepositoryImpl implements LectureRepository {
  private lectures: Lecture[] = [];

  async save(lecture: Lecture): Promise<void> {
    const index = this.lectures.findIndex((l) => l.id === lecture.id);
    if (index > -1) {
      this.lectures[index] = lecture;
    } else {
      this.lectures.push(lecture);
    }
  }

  async findById(id: number): Promise<Lecture | null> {
    return this.lectures.find((l) => l.id === id) || null;
  }

  async findByDate(date: Date): Promise<Lecture[]> {
    return this.lectures.filter(
      (l) =>
        l.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10),
    );
  }

  async findAll(): Promise<Lecture[]> {
    return this.lectures;
  }
}
