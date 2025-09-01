import { Injectable } from '@nestjs/common';
import { ClientBookingDto } from './dtos/client.booking.dto';
import { CreateBookingDetailProvider } from './provider/creat-booking-detail-provider';
import { DeleteBookingDetail } from './provider/delete.booking.detail';
import { UpdateBookingDetailProvider } from './provider/update.booking.detail.provider';
import { ClientBookingUpdateDto } from './dtos/client.booking.update.dto';
import { FindBookingDetailProvider } from './provider/find.booking.detail.provider';

@Injectable()
export class ClientBookingService {
  constructor(
    private readonly createBookingDetailerProvider: CreateBookingDetailProvider,
    private readonly deleteBookingDetail: DeleteBookingDetail,
    private readonly updateBookingDetailProvider: UpdateBookingDetailProvider,
    private readonly findBookingDetailProvider: FindBookingDetailProvider,
  ) {}

  public createBookingDetail(clientBookingDto: ClientBookingDto) {
    return this.createBookingDetailerProvider.create(clientBookingDto);
  }

  public delete(id: number) {
    return this.deleteBookingDetail.delete(id);
  }

  public update(id: number, clientBookingUpdateDto: ClientBookingUpdateDto) {
    return this.updateBookingDetailProvider.update(id, clientBookingUpdateDto);
  }

  public getAllBookingDetail(
    registration: string,
    telDto: string,
    limit: number,
  ) {
    return this.findBookingDetailProvider.findAll(registration, telDto, limit);
  }
}
