import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from '../dtos/booking.create.dto';
import { TrailerService } from 'src/trailer/tralier.service';
import { RegionServiceService } from 'src/region/region.service.service';
import { RegionsEnum } from 'src/common/enums/region.enum';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class CreateBooking {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly regionService: RegionServiceService,
    private readonly trailerService: TrailerService,
    private readonly provinceService: ProvinceService,
  ) {}

  public async createBooking(createBookingDto: CreateBookingDto) {
    const trailer = await this.trailerService.findById(
      createBookingDto.trailer,
    );

    const from = await this.regionService.findByRegion(
      createBookingDto.from as RegionsEnum,
    );

    const to = await this.regionService.findByRegion(
      createBookingDto.to as RegionsEnum,
    );

    if (!trailer)
      throw new BadRequestException(
        'Please check  your trailer Id, provide valid Id',
      );

    const province = await this.provinceService.findMultiple(
      createBookingDto.province,
    );

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      from,
      to,
      trailer,
      province,
    });

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
