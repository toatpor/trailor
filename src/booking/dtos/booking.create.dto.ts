import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BookingStatus } from '../enums/booking.status';
import { RegionsEnum } from 'src/common/enums/region.enum';

export class CreateBookingDto {
  @IsDateString()
  @IsNotEmpty()
  departureDate: string;

  @IsDateString()
  @IsNotEmpty()
  arriveDate: string;

  @IsEnum(BookingStatus)
  @IsString()
  @IsNotEmpty()
  status: BookingStatus;

  @IsEnum(RegionsEnum)
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsEnum(RegionsEnum)
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(500)
  deposit: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  trailer: number;

  @IsArray()
  @IsInt({ each: true })
  // @IsOptional()
  @IsNotEmpty()
  province: number[];
}
