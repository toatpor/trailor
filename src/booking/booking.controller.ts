import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBookingDto } from './dtos/booking.create.dto';
import { BookingService } from './booking.service';
import { UpdateBookingDto } from './dtos/booking.update.dto';
import { UpdateStatusDto } from './dtos/booking.updateStatus.dto';
import { CreateMultipleBookingDto } from './dtos/bookinh.createMultiple';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  public createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  public getBooking() {
    return this.bookingService.getBooking();
  }

  @Post('/create-booking-south/')
  public bookingMultiple(
    @Query('numberBooking') numberBooking: number,
    @Query('manyDay') manyDay: number,
    @Query('date') date: Date,
    @Body() createMultipleBookingDto: CreateMultipleBookingDto,
  ) {
    return this.bookingService.createBookingSouth(
      numberBooking,
      manyDay,
      date,
      createMultipleBookingDto,
    );
  }

  @Post('/create-booking-north')
  public northMultiple(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBookingNorth(createBookingDto);
  }

  @Delete('/:id')
  public deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.delete(id);
  }

  @Patch('/updateToDepart')
  public updateToDepart() {
    return this.bookingService.updateToDepart();
  }

  @Patch('/updateArrived')
  public updateArrive() {
    return this.bookingService.updateArrived();
  }

  @Patch('/:id')
  public updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  // @Patch('/capacity/:id')
  // public addCapacity(@Param('id', ParseIntPipe) id: number) {
  //   return this.bookingService.addCapacity(id);
  // }

  @Patch('/status/:id')
  public updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.bookingService.updateStatusTrailer(id, updateStatusDto);
  }

  @Get('/changeRegion')
  public updateToChiangMai() {
    return this.bookingService.updateToChiangmai();
  }
}
