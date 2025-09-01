import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddCapacity {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async addCapacity(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (booking.capacity > 8)
      throw new BadRequestException('Capacity should not greater than 8');

    booking.capacity = booking.capacity + 1;
    booking.deposit = booking.deposit + 500;

    try {
      await this.bookingRepository.save(booking);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }
  }

  public async decrementCapacity(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id });

    if (booking.capacity < 0)
      throw new BadRequestException('Capacity should not less than 0');

    await this.bookingRepository.decrement({ id }, 'capacity', 1);
  }
}
