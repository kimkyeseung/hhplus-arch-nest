import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LectureService } from '../../application/lecture/lecture.service';

@Controller('lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  async createLecture(
    @Body()
    createLectureDto: {
      title: string;
      instructorName: string;
      date: string;
    },
  ) {
    const { title, instructorName, date } = createLectureDto;
    return this.lectureService.createLecture(
      title,
      instructorName,
      new Date(date),
    );
  }

  @Get('available')
  async getAvailableLectures(@Query('date') date: string) {
    if (!date) {
      throw new HttpException(
        'Date query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.lectureService.getAvailableLectures(new Date(date));
  }

  @Get('completed')
  async getCompletedLectures(@Query('userId') userId: string) {
    if (!userId) {
      throw new HttpException(
        'UserId query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.lectureService.getCompletedLectures(+userId);
  }

  @Get(':id')
  async getLectureById(@Param('id') id: string) {
    return this.lectureService.getLectureById(+id);
  }

  @Get('date/:date')
  async getLecturesByDate(@Param('date') date: string) {
    return this.lectureService.getLecturesByDate(new Date(date));
  }

  @Post(':id/register')
  async registerParticipant(
    @Param('id') lectureId: string,
    @Body() registerDto: { userId: number },
  ) {
    const { userId } = registerDto;
    try {
      await this.lectureService.registerParticipant(+lectureId, userId);
      return {
        message: 'Participant registered successfully',
        lectureId,
        userId,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          lectureId: +lectureId,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
