import { ConflictException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Raw, Repository } from 'typeorm';
import { BookingStatus } from '../enums/booking.status';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArriveProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async updateStatusToDepart() {
    const booking = await this.bookingRepository.find({
      where: {
        arriveDate: Raw((alias) => `Date(${alias}) <= CURRENT_DATE`),
        status: 'depart' as BookingStatus,
      },
    });

    if (!booking)
      throw new ConflictException('There is no trailer depart today');

    for (const book of booking) {
      book.status = 'arrived' as BookingStatus;
    }

    try {
      await this.bookingRepository.save(booking);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }

    return { message: 'Booking status has been changed to arrive' };
  }
}

//  Raw((alias) => `${alias} > :date`, {
//           date: formatISO(new Date(), {
//             representation: 'date',
//           }) as null as Date,
//         }),
