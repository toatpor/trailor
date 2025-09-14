import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsInt,
  IsEnum,
} from 'class-validator';
import { UserSex } from '../enums/sex.enum';
import { NotGreater } from './shouldGreater';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(96)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(96)
  lastName: string;

  @IsPhoneNumber('TH', { message: 'Please provider valid phone number' })
  @IsNotEmpty()
  tel: string;

  @IsEnum(UserSex)
  @IsString()
  // @IsNumber()
  // @IsInt()
  // @IsOptional()
  @IsNotEmpty()
  sex: UserSex;

  @IsNumber()
  @IsInt()
  @NotGreater()
  @IsOptional()
  age: number = new Date().getFullYear() - 18;
}
