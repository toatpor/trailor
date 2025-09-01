import { IntersectionType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DestinationEnum } from 'src/common/enums/destination.enum';
import { CreateUserDto } from 'src/user/dtos/create.user.dtos';
import { VehicleDto } from 'src/vehicle/dtos/createVehicle.dtos';

export class ClientBookingDto extends IntersectionType(
  VehicleDto,
  CreateUserDto,
) {
  @IsEnum(DestinationEnum)
  @IsString()
  @IsNotEmpty()
  pick: DestinationEnum;

  @IsEnum(DestinationEnum)
  @IsString()
  @IsNotEmpty()
  drop: DestinationEnum;

  @IsNumber()
  @IsNotEmpty()
  booking: number;

  @IsString()
  @MaxLength(512)
  @IsOptional()
  remark?: string;

  @IsOptional()
  @IsBoolean()
  transit: boolean = false;

  @IsOptional()
  @IsBoolean()
  isBig: boolean = false;
  // @IsNumber()
  // @IsNotEmpty()
  // vehicle: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   vehicle: number;

  //   @IsEnum(brandCarEnum)
  //   @IsString()
  //   @IsNotEmpty()
  //   brand: brandCarEnum;

  //   @IsString()
  //   @IsNotEmpty()
  //   @MinLength(3)
  //   @MaxLength(7)
  //   registration: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @MinLength(2)
  //   @MaxLength(96)
  //   name: string;

  //   @IsString()
  //   @IsOptional()
  //   @MinLength(2)
  //   @MaxLength(96)
  //   lastName: string;

  //   @IsPhoneNumber('TH', { message: 'Please provider valid phone number' })
  //   @IsNotEmpty()
  //   tel: string;

  //   @IsEnum(UserSex)
  //   @IsString()
  //   @IsNotEmpty()
  //   sex: UserSex;

  //   @IsNumber()
  //   @IsInt()
  //   @NotGreater()
  //   age: number;
}
