import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicle.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UpdateVehicleDtos } from '../dtos/updateVehicle.dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UpdateVehicle {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,

    private readonly userService: UserService,
  ) {}

  public async update(id: number, updateVehicleDtos: UpdateVehicleDtos) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });

    if (!vehicle)
      throw new BadRequestException('Please provide valid id of vehicle');
    vehicle.model = updateVehicleDtos.model ?? vehicle.model;

    vehicle.brand = updateVehicleDtos.brand ?? vehicle.brand;
    vehicle.registration =
      updateVehicleDtos.registration ?? vehicle.registration;

    vehicle.owner = updateVehicleDtos.owner
      ? await this.userService.findUserById(updateVehicleDtos.owner)
      : vehicle.owner;

    try {
      await this.vehicleRepository.save(vehicle);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment',
        { description: 'Error connection to database' },
      );
    }

    return vehicle;
  }
}
