import { PickType } from '@nestjs/mapped-types';
import { VehicleDto } from './createVehicle.dtos';

export class FindByRegistration extends PickType(VehicleDto, [
  'registration',
]) {}
