import { PickType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './booking.create.dto';

export class UpdateStatusDto extends PickType(CreateBookingDto, ['status']) {}
