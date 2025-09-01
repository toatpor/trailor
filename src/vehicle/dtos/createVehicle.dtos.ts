import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { brandCarEnum } from '../enums/brand.enum';

export class VehicleDto {
  @IsEnum(brandCarEnum)
  @IsString()
  @IsNotEmpty()
  brand: brandCarEnum;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(7)
  registration: string;

  @IsNumber()
  @IsInt()
  @IsOptional()
  owner: number;

  @IsString()
  @IsOptional()
  model: string;
}
