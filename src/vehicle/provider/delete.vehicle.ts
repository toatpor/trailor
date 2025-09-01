import {
  ConflictException,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteVehicle {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  public async DeleteVehicle(@Param('id', ParseIntPipe) id: number) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });

    if (!vehicle)
      throw new ConflictException(
        'Please check vehicle id, this vehicle does not exist ',
      );

    await this.vehicleRepository.delete(id);
    return { message: 'Vehicle has been deleted' };
  }
}
