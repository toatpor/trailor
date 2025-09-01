import { Injectable } from '@nestjs/common';
import { VehicleDto } from './dtos/createVehicle.dtos';
import { CreateVehicle } from './provider/create.vehicle';
import { DeleteVehicle } from './provider/delete.vehicle';
import { UpdateVehicleDtos } from './dtos/updateVehicle.dtos';
import { UpdateVehicle } from './provider/update.vehicle';
import { FindVehicle } from './provider/find.vehicle';
import { FindByRegistration } from './dtos/findVehicleByRegistration';

@Injectable()
export class VehicleService {
  constructor(
    private readonly createVehicle: CreateVehicle,
    private readonly deleteVehicle: DeleteVehicle,
    private readonly updateVehicle: UpdateVehicle,
    private readonly findVehicle: FindVehicle,
  ) {}
  public create(vehicleDto: VehicleDto) {
    return this.createVehicle.createVehicle(vehicleDto);
  }

  public delete(id: number) {
    return this.deleteVehicle.DeleteVehicle(id);
  }

  public update(id: number, updateVehicleDtos: UpdateVehicleDtos) {
    return this.updateVehicle.update(id, updateVehicleDtos);
  }

  public findAll() {
    return this.findVehicle.findAll();
  }

  public findByRegistration(registration: FindByRegistration) {
    return this.findVehicle.findByRegistration(registration);
  }

  public findById(id: number) {
    return this.findVehicle.findById(id);
  }
}
