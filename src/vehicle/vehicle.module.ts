import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicle } from './provider/create.vehicle';
import { VehicleController } from './vehicle.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './vehicle.entity';
import { DeleteVehicle } from './provider/delete.vehicle';
import { UpdateVehicle } from './provider/update.vehicle';
import { FindVehicle } from './provider/find.vehicle';

@Module({
  providers: [
    VehicleService,
    CreateVehicle,
    DeleteVehicle,
    UpdateVehicle,
    FindVehicle,
  ],
  controllers: [VehicleController],
  imports: [UserModule, TypeOrmModule.forFeature([VehicleEntity])],

  exports: [VehicleService],
})
export class VehicleModule {}
