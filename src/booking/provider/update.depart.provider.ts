import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Raw, Repository } from 'typeorm';
import { BookingStatus } from '../enums/booking.status';

@Injectable()
export class UpdateDepartProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async updateStatusToDepart() {
    const booking = await this.bookingRepository.find({
      where: {
        departureDate: Raw((alias) => `Date(${alias}) <= CURRENT_DATE`),
        status: 'pending' as BookingStatus,
      },
    });

    if (!booking)
      throw new ConflictException('There is no trailer depart today');

    for (const book of booking) {
      book.status = 'depart' as BookingStatus;
    }

    try {
      await this.bookingRepository.save(booking);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }

    return { message: 'Booking status has been changed to depart' };
  }
}

//  Raw((alias) => `${alias} > :date`, {
//           date: formatISO(new Date(), {
//             representation: 'date',
//           }) as null as Date,
//         }),
