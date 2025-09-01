import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientBookingController } from './client.booking.controller';
import { ClientBookingService } from './client.booking.service';
import { ClientBookingEntity } from './client.booking.entity';
import { CreateBookingDetailProvider } from './provider/creat-booking-detail-provider';
import { UserModule } from 'src/user/user.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { DeleteBookingDetail } from './provider/delete.booking.detail';
import { BookingModule } from 'src/booking/booking.module';
import { UpdateBookingDetailProvider } from './provider/update.booking.detail.provider';
import { FindBookingDetailProvider } from './provider/find.booking.detail.provider';
import { ProvinceModule } from 'src/province/province.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientBookingEntity]),
    UserModule,
    VehicleModule,
    ProvinceModule,
    BookingModule,
  ],
  providers: [
    ClientBookingService,
    CreateBookingDetailProvider,
    DeleteBookingDetail,
    UpdateBookingDetailProvider,
    FindBookingDetailProvider,
  ],
  controllers: [ClientBookingController],
})
export class ClientBookingModule {}
