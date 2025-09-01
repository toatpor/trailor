import { PickType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './booking.create.dto';

export class NorthBookingDto extends PickType(CreateBookingDto, [
  'departureDate',
  'arriveDate',
]) {}
