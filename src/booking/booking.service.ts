import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dtos/booking.create.dto';
import { CreateBooking } from './provider/create.booking.provider';
import { GetBookingProvider } from './provider/get-booking.provider';
import { DeleteBookingProvider } from './provider/delete-booking.provider';
import { UpdateBookingDto } from './dtos/booking.update.dto';
import { UpdateBookingProvider } from './provider/update.booking.provider';
import { AddCapacity } from './provider/add.capacity';
import { UpdateStatusProvider } from './provider/update.status.provider';
import { UpdateStatusDto } from './dtos/booking.updateStatus.dto';
import { UpdatePrevBooking } from './provider/update-prev-booking';
import { UpdateDepartProvider } from './provider/update.depart.provider';
import { CreateMultipleBooking } from './provider/create.booking.south.provider';
import { CreateMultipleBookingDto } from './dtos/bookinh.createMultiple';
import { UpdateArriveProvider } from './provider/update.arrive.provider';
import { CreateBookingNorthProvider } from './provider/create.booking.north.provider';
import { UpdateToChaingmaiProvider } from './provider/update-to-chaingmai.provider';

@Injectable()
export class BookingService {
  constructor(
    private readonly createBookingProvider: CreateBooking,
    private readonly createMultipleBookingProvider: CreateMultipleBooking,
    private readonly createBookingNorthProvider: CreateBookingNorthProvider,
    private readonly getAllBooking: GetBookingProvider,
    private readonly deleteBooking: DeleteBookingProvider,
    private readonly updateBooking: UpdateBookingProvider,
    private readonly capacity: AddCapacity,
    private readonly updateStatus: UpdateStatusProvider,
    private readonly updatePrevBooking: UpdatePrevBooking,
    private readonly updateDepart: UpdateDepartProvider,
    private readonly updateArrive: UpdateArriveProvider,
    private readonly updateToChiangmaiProvider: UpdateToChaingmaiProvider,
  ) {}

  public createBooking(createBookingDto: CreateBookingDto) {
    return this.createBookingProvider.createBooking(createBookingDto);
  }

  public createBookingSouth(
    numberBooking: number,
    manyDay: number,
    date: Date,
    createMultipleBookingDto: CreateMultipleBookingDto,
  ) {
    return this.createMultipleBookingProvider.createMultipleBooking(
      numberBooking,
      manyDay,
      date,
      createMultipleBookingDto,
    );
  }

  public createBookingNorth(createBookingDto: CreateBookingDto) {
    return this.createBookingNorthProvider.create(createBookingDto);
  }

  public getBooking() {
    return this.getAllBooking.getAllBooking();
  }

  public getBookingById(id: number) {
    return this.getAllBooking.getBookingById(id);
  }

  public delete(id: number) {
    return this.deleteBooking.DeleteBookingProvider(id);
  }

  public update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.updateBooking.updateBooking(id, updateBookingDto);
  }

  // working with capacity
  public addCapacity(id: number) {
    return this.capacity.addCapacity(id);
  }

  public decrementCapacity(id: number) {
    return this.capacity.decrementCapacity(id);
  }

  public updateStatusTrailer(id: number, updateStatusDto: UpdateStatusDto) {
    return this.updateStatus.updateStatus(id, updateStatusDto);
  }

  public decrementPrevBooking(id: number) {
    return this.updatePrevBooking.decrementPrevBooking(id);
  }

  public updateToDepart() {
    return this.updateDepart.updateStatusToDepart();
  }

  public updateArrived() {
    return this.updateArrive.updateStatusToDepart();
  }

  public updateToChiangmai() {
    return this.updateToChiangmaiProvider.update();
  }
}
