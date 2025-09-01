import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './booking.create.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
