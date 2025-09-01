import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetBookingProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async getAllBooking() {
    return await this.bookingRepository.find({
      relations: ['trailer', 'to', 'from', 'province'],
    });
  }

  public async getBookingById(id: number) {
    return await this.bookingRepository.findOne({ where: { id } });
  }
}
