import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { CreateBooking } from './provider/create.booking.provider';
import { BookingEntity } from './booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailerModule } from 'src/trailer/trailer.module';
import { GetBookingProvider } from './provider/get-booking.provider';
import { DeleteBookingProvider } from './provider/delete-booking.provider';
import { UpdateBookingProvider } from './provider/update.booking.provider';
import { AddCapacity } from './provider/add.capacity';
import { UpdateStatusProvider } from './provider/update.status.provider';
import { UpdatePrevBooking } from './provider/update-prev-booking';
import { RegionModule } from 'src/region/region.module';
import { ProvinceModule } from 'src/province/province.module';
import { UpdateDepartProvider } from './provider/update.depart.provider';
import { CreateMultipleBooking } from './provider/create.booking.south.provider';
import { UpdateArriveProvider } from './provider/update.arrive.provider';
import { CreateBookingNorthProvider } from './provider/create.booking.north.provider';
import { UpdateToChaingmaiProvider } from './provider/update-to-chaingmai.provider';

@Module({
  providers: [
    BookingService,
    CreateBooking,
    GetBookingProvider,
    DeleteBookingProvider,
    UpdateBookingProvider,
    AddCapacity,
    UpdateStatusProvider,
    UpdatePrevBooking,
    UpdateDepartProvider,
    CreateMultipleBooking,
    UpdateArriveProvider,
    CreateBookingNorthProvider,
    UpdateToChaingmaiProvider,
  ],
  controllers: [BookingController],

  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    TrailerModule,
    RegionModule,
    ProvinceModule,
  ],
  exports: [BookingService],
})
export class BookingModule {}
