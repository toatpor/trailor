import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from '../booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, addHours } from 'date-fns';
import { RegionServiceService } from 'src/region/region.service.service';
import { RegionsEnum } from 'src/common/enums/region.enum';
import { TrailerService } from 'src/trailer/tralier.service';
import { CreateMultipleBookingDto } from '../dtos/bookinh.createMultiple';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class CreateMultipleBooking {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly regionService: RegionServiceService,
    private readonly trailerService: TrailerService,
    private readonly provinceService: ProvinceService,
  ) {}

  public async createMultipleBooking(
    numberBooking: number,
    manyDay: number,
    date: Date,
    createMultipleBookingDto: CreateMultipleBookingDto,
  ) {
    const departDate = [];
    let count = 1;

    while (numberBooking > 0) {
      departDate.push(addDays(addHours(new Date(date), 7), manyDay * count));
      numberBooking -= 1;
      count += 1;
    }

    const arriveDate = departDate.map((x) => addDays(x, 2));

    for (const [index, element] of departDate.entries()) {
      const from = await this.regionService.findByRegion(
        createMultipleBookingDto.from as RegionsEnum,
      );
      const to = await this.regionService.findByRegion(
        createMultipleBookingDto.to as RegionsEnum,
      );
      const trailer = await this.trailerService.findById(
        createMultipleBookingDto.trailer,
      );

      if (!trailer)
        throw new ConflictException(
          'Please check  your trailer Id, provide valid Id',
        );

      const province = await this.provinceService.findMultiple(
        createMultipleBookingDto.province,
      );

      if (
        !province ||
        province.length !== createMultipleBookingDto.province.length
      )
        throw new ConflictException(
          'Please check  your trailer Id, provide valid Id',
        );

      const booking = this.bookingRepository.create({
        departureDate: element,
        arriveDate: arriveDate[index],
        from,
        to,
        trailer,
        province,
      });

      await this.bookingRepository.save(booking);
    }
  }
}
