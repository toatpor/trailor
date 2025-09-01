import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBookingEntity } from '../client.booking.entity';
import { Repository } from 'typeorm';
import { limitPerPages } from 'src/common/constants/limit.constants';

@Injectable()
export class FindBookingDetailProvider {
  constructor(
    @InjectRepository(ClientBookingEntity)
    private readonly clientBookingRepository: Repository<ClientBookingEntity>,
  ) {}

  public async findAll(
    registrationNumber: string,
    telDto: string,
    limit: number,
  ) {
    return await this.clientBookingRepository.find({
      // filter
      where: {
        vehicle: {
          registration: registrationNumber ? registrationNumber : null,
        },
        user: {
          tel: telDto ? telDto : null,
        },
      },
      relations: ['booking', 'vehicle', 'user', 'pick', 'drop'],
      order: { booking: { departureDate: 'ASC' } },
      take: limit ? limit : limitPerPages,
    });
  }
}
