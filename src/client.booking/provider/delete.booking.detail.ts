import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBookingEntity } from '../client.booking.entity';
import { Repository } from 'typeorm';
import { BookingService } from 'src/booking/booking.service';

@Injectable()
export class DeleteBookingDetail {
  constructor(
    @InjectRepository(ClientBookingEntity)
    private readonly bookingDetailRepository: Repository<ClientBookingEntity>,
    private readonly bookingService: BookingService,
  ) {}

  public async delete(id: number) {
    const bookingDetail = await this.bookingDetailRepository.findOne({
      where: { id },
      // find nest relationship
      //   relations: { booking: true, vehicle: { owner: true  },
      relations: { booking: true },
    });

    if (!bookingDetail)
      throw new ConflictException(
        'Please check your booking-detail id, provide valid id',
      );

    try {
      await this.bookingService.decrementCapacity(bookingDetail.booking.id);
      await this.bookingDetailRepository.delete(bookingDetail.id);
      return { message: `booking detail  has been deleted` };
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }
  }
}
