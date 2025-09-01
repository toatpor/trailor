import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from '../booking.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteBookingProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async DeleteBookingProvider(id: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking)
      throw new BadRequestException(
        'Please check your booking id, provide valid booking id ',
      );

    await this.bookingRepository.delete(booking);
    return 'Your booking has been deleted';
  }
}
