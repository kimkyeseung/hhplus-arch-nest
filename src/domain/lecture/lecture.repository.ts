import { Lecture } from './lecture.entity';

export interface LectureRepository {
  save(lecture: Lecture): Promise<void>;
  findById(id: number): Promise<Lecture | null>;
  findByDate(date: Date): Promise<Lecture[]>;
}
