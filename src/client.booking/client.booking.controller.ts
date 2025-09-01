import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ClientBookingDto } from './dtos/client.booking.dto';
import { ClientBookingService } from './client.booking.service';
import { ClientBookingUpdateDto } from './dtos/client.booking.update.dto';

@Controller('detail')
export class ClientBookingController {
  constructor(private readonly clientBookingService: ClientBookingService) {}

  @Post()
  public createBookingDetail(@Body() clientBookingDto: ClientBookingDto) {
    return this.clientBookingService.createBookingDetail(clientBookingDto);
  }

  @Delete('/:id')
  public deleteBookingDetail(@Param('id', ParseIntPipe) id: number) {
    return this.clientBookingService.delete(id);
  }

  @Patch('/:id')
  public updateBookingDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() clientBookingUpdateDto: ClientBookingUpdateDto,
  ) {
    return this.clientBookingService.update(id, clientBookingUpdateDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public getAllBooking(
    @Query('registration') registration?: string,
    @Query('tel') telDto?: string,
    @Query('limit') limit?: number,
  ) {
    return this.clientBookingService.getAllBookingDetail(
      registration,
      telDto,
      limit,
    );
  }
}
