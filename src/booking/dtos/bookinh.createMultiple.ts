import { PickType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './booking.create.dto';

export class CreateMultipleBookingDto extends PickType(CreateBookingDto, [
  'from',
  'to',
  'trailer',
  'province',
]) {}
