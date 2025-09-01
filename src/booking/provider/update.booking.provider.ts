import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';
import { UpdateBookingDto } from '../dtos/booking.update.dto';
import { TrailerService } from 'src/trailer/tralier.service';
import { RegionServiceService } from 'src/region/region.service.service';
import { RegionsEnum } from 'src/common/enums/region.enum';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class UpdateBookingProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly trailerService: TrailerService,
    private readonly regionService: RegionServiceService,
    private readonly provinceService: ProvinceService,
  ) {}

  public async updateBooking(id: number, updateBookingDto: UpdateBookingDto) {
    let province = undefined;

    if (updateBookingDto.province && updateBookingDto.province.length > 0) {
      province = await this.provinceService.findMultiple(
        updateBookingDto.province,
      );

      if (!province || province.length !== updateBookingDto.province.length)
        throw new BadRequestException(
          'Please check your province id, ensure it correct',
        );
    }

    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking)
      throw new BadRequestException(
        'Please check your booking id, provide valid booking id',
      );

    booking.arriveDate =
      (updateBookingDto.arriveDate as unknown as Date) ?? booking.arriveDate;

    booking.departureDate =
      (updateBookingDto.departureDate as unknown as Date) ??
      booking.departureDate;

    booking.to = updateBookingDto.to
      ? await this.regionService.findByRegion(
          updateBookingDto.to as RegionsEnum,
        )
      : booking.to;
    booking.from = updateBookingDto.from
      ? await this.regionService.findByRegion(
          updateBookingDto.from as RegionsEnum,
        )
      : booking.from;
    booking.trailer = updateBookingDto.trailer
      ? await this.trailerService.findById(updateBookingDto.trailer)
      : booking.trailer;
    booking.deposit = updateBookingDto.deposit ?? booking.deposit;
    booking.status = updateBookingDto.status ?? booking.status;

    booking.province = province ?? booking.province;
    try {
      await this.bookingRepository.save(booking);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }

    return booking;
  }
}
