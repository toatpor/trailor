import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Registration } from '../enum/registration.enum';

export class CreateTrailerDtos {
  @IsEnum(Registration)
  @IsString()
  @IsNotEmpty()
  registration: Registration;

  @IsDateString({ strict: true })
  @IsNotEmpty()
  actExpire: string;
}
