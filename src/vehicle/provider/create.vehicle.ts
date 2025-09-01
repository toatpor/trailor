import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleDto } from '../dtos/createVehicle.dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CreateVehicle {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    private readonly userService: UserService,
  ) {}

  public async createVehicle(vehicleDto: VehicleDto) {
    //Note this could be fix when start create booking
    const user = await this.userService.findUserById(vehicleDto.owner);
    if (!user) throw new BadRequestException('Please provide valid id');
    //

    const data = this.vehicleRepository.create({ ...vehicleDto, owner: user });

    try {
      await this.vehicleRepository.save(data);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment please try again',
        { description: 'Error connecting to database' },
      );
    }

    return data;
  }
}
