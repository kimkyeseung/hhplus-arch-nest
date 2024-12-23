import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { Lecture } from '../../domain/lecture/lecture.entity';
import { LectureRepository } from '../../domain/lecture/lecture.repository';
import { LECTURE_REPOSITORY } from '../../domain/lecture/lecture.constants';

describe('LectureService', () => {
  let service: LectureService;
  let mockLectureRepository: Partial<LectureRepository>;

  beforeEach(async () => {
    mockLectureRepository = {
      findByDate: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LECTURE_REPOSITORY, // 토큰 사용
          useValue: mockLectureRepository,
        },
      ],
    }).compile();

    service = module.get<LectureService>(LectureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableLectures', () => {
    it('should return lectures with participants less than 30', async () => {
      const mockDate = new Date('2024-12-30');
      const mockLectures = [
        new Lecture(1, 'Lecture 1', 'Instructor 1', mockDate, [1, 2]),
        new Lecture(2, 'Lecture 2', 'Instructor 2', mockDate, Array(30)), // 정원 초과
      ];

      jest
        .spyOn(mockLectureRepository, 'findByDate')
        .mockResolvedValue(mockLectures);

      const availableLectures = await service.getAvailableLectures(mockDate);

      expect(availableLectures.length).toBe(1);
      expect(availableLectures[0].title).toBe('Lecture 1');
    });

    it('should return an empty array if no lectures are available', async () => {
      const mockDate = new Date('2024-12-30');
      const mockLectures = [
        new Lecture(1, 'Lecture 1', 'Instructor 1', mockDate, Array(30)), // 정원 초과
      ];

      jest
        .spyOn(mockLectureRepository, 'findByDate')
        .mockResolvedValue(mockLectures);

      const availableLectures = await service.getAvailableLectures(mockDate);

      expect(availableLectures.length).toBe(0);
    });
  });
});
