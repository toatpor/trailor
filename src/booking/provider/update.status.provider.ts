import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';
import { UpdateStatusDto } from '../dtos/booking.updateStatus.dto';

@Injectable()
export class UpdateStatusProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking)
      throw new BadRequestException(
        'Invalid id number, Please provider booking valid id',
      );

    booking.status = updateStatusDto.status;

    try {
      await this.bookingRepository.save(booking);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }

    return booking;
  }
}
