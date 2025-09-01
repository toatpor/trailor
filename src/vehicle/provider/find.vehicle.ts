import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicle.entity';
import { Repository } from 'typeorm';
import { FindByRegistration } from '../dtos/findVehicleByRegistration';

@Injectable()
export class FindVehicle {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  public async findAll() {
    return await this.vehicleRepository.find({ relations: { owner: true } });
  }

  public async findByRegistration(registration: FindByRegistration) {
    return await this.vehicleRepository.findOneBy(registration);
  }

  public async findById(id: number) {
    return await this.vehicleRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }
}
