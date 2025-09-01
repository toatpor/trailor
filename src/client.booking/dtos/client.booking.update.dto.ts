import { PartialType } from '@nestjs/mapped-types';
import { ClientBookingDto } from './client.booking.dto';

export class ClientBookingUpdateDto extends PartialType(ClientBookingDto) {}
