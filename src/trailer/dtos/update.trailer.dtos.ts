import { PickType } from '@nestjs/mapped-types';
import { CreateTrailerDtos } from './create.trailer.dtos';

export class UpdateTrailerDto extends PickType(CreateTrailerDtos, [
  'actExpire',
]) {}
