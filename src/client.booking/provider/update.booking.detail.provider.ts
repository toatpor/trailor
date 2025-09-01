import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBookingEntity } from '../client.booking.entity';
import { Repository } from 'typeorm';
// import { VehicleService } from 'src/vehicle/vehicle.service';
import { BookingService } from 'src/booking/booking.service';
import { ClientBookingUpdateDto } from '../dtos/client.booking.update.dto';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class UpdateBookingDetailProvider {
  constructor(
    @InjectRepository(ClientBookingEntity)
    private readonly clientBookingRepository: Repository<ClientBookingEntity>,
    private readonly bookingService: BookingService,
    private readonly provinceService: ProvinceService,
  ) {}

  public async update(
    id: number,
    clientBookingUpdateDto: ClientBookingUpdateDto,
  ) {
    const bookingDetail = await this.clientBookingRepository.findOne({
      where: { id },
      relations: ['booking', 'pick', 'drop'],
    });
    if (!bookingDetail)
      throw new ConflictException('Please provide valid booking detail id');

    bookingDetail.pick = clientBookingUpdateDto.pick
      ? await this.provinceService.findByProvince(clientBookingUpdateDto.pick)
      : bookingDetail.pick;

    bookingDetail.drop = clientBookingUpdateDto.drop
      ? await this.provinceService.findByProvince(clientBookingUpdateDto.drop)
      : bookingDetail.drop;

    bookingDetail.remark =
      clientBookingUpdateDto.remark ?? bookingDetail.remark;

    // changing booking capacity and deposit
    if (clientBookingUpdateDto.booking) {
      const booking = await this.bookingService.getBookingById(
        clientBookingUpdateDto.booking,
      );
      if (!booking || booking.capacity >= 8)
        throw new BadRequestException(
          'Capacity should not greater than 8 or booking id was not exist',
        );
      //Readme decrease prev booking swap deposit and deduct capacity
      this.bookingService.decrementPrevBooking(bookingDetail.booking.id);
      bookingDetail.booking = booking;
      this.bookingService.addCapacity(clientBookingUpdateDto.booking);
    }

    try {
      await this.clientBookingRepository.save(bookingDetail);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }
    return bookingDetail;
  }
}
