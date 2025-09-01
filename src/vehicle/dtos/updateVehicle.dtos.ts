import { PartialType } from '@nestjs/mapped-types';
import { VehicleDto } from './createVehicle.dtos';

export class UpdateVehicleDtos extends PartialType(VehicleDto) {}
