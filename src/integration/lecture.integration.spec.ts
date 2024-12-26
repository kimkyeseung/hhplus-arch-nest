import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from '../../src/infrastructure/config/typeorm.config';

describe('Lecture Registration Concurrency', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRoot(typeOrmTestConfig)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow only 30 participants for a lecture', async () => {
    const lecture = {
      title: 'Concurrent Lecture',
      instructorName: 'Test Instructor',
      date: '2024-12-30',
    };

    // Create a lecture
    const { body: createdLecture } = await request(app.getHttpServer())
      .post('/lectures')
      .send(lecture)
      .expect(201);

    const lectureId = createdLecture.id;

    // Simulate 40 concurrent requests
    const promises = Array.from({ length: 40 }, (_, i) =>
      request(app.getHttpServer())
        .post(`/lectures/${lectureId}/register`)
        .send({ userId: i + 1 }),
    );

    const results = await Promise.all(promises);

    // Count successes and failures
    const successes = results.filter((res) => res.status === 201).length;
    const failures = results.filter((res) => res.status === 400).length;

    expect(successes).toBe(30); // Only 30 should succeed
    expect(failures).toBe(10); // Remaining should fail
  });
});
