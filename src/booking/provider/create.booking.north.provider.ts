import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from '../dtos/booking.create.dto';
import { addDays, addHours, eachDayOfInterval, getDay } from 'date-fns';
import { RegionServiceService } from 'src/region/region.service.service';
import { ProvinceService } from 'src/province/province.service';
import { TrailerService } from 'src/trailer/tralier.service';
import { RegionsEnum } from 'src/common/enums/region.enum';

@Injectable()
export class CreateBookingNorthProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly regionService: RegionServiceService,
    private readonly provinceService: ProvinceService,
    private readonly trailerService: TrailerService,
  ) {}
  public async create(createBookingDto: CreateBookingDto) {
    const allDaysInInterval = eachDayOfInterval({
      start: createBookingDto.departureDate,
      end: createBookingDto.arriveDate,
    });

    const tuesdayAndFriday = allDaysInInterval.filter((date) => {
      const daysOfWeek = getDay(date);
      return daysOfWeek === 2 || daysOfWeek === 5;
    });

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

    for (const day of tuesdayAndFriday) {
      const booking = this.bookingRepository.create({
        departureDate: addHours(day, 7),
        arriveDate: addDays(addHours(day, 7), 1),
        from,
        trailer,
        to,
        province,
      });

      await this.bookingRepository.save(booking);
    }

    return { message: 'Chaingmai Schedule was created successfully' };
  }
}

// import { eachDayOfInterval, getDay } from 'date-fns';

// const startDate = new Date(2025, 0, 1); // January 1, 2025
// const endDate = new Date(2025, 0, 31); // January 31, 2025

// const allDaysInInterval = eachDayOfInterval({ start: startDate, end: endDate });

// const tuesdaysAndFridays = allDaysInInterval.filter((date) => {
//   const dayOfWeek = getDay(date);
//   return dayOfWeek === 2 || dayOfWeek === 5; // 2 for Tuesday, 5 for Friday
// });

// console.log(tuesdaysAndFridays);
