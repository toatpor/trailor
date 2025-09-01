import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { VehicleDto } from './dtos/createVehicle.dtos';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDtos } from './dtos/updateVehicle.dtos';
import { FindByRegistration } from './dtos/findVehicleByRegistration';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('createVehicle')
  public async createVehicle(@Body() vehicleDto: VehicleDto) {
    return this.vehicleService.create(vehicleDto);
  }

  @Delete('deleteVehicle/:id')
  public async deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.delete(id);
  }

  @Patch('updateVehicle/:id')
  public async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDtos: UpdateVehicleDtos,
  ) {
    return this.vehicleService.update(id, updateVehicleDtos);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAllVehicle() {
    return this.vehicleService.findAll();
  }

  @Get('/:registration')
  public async findByRegistration(
    @Param('registration') registration: FindByRegistration,
  ) {
    return this.vehicleService.findByRegistration(registration);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/getBy/:id')
  public async findById(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findById(id);
  }
}
