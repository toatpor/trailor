import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../booking.entity';
import { In, Repository } from 'typeorm';
import { RegionServiceService } from 'src/region/region.service.service';
import { RegionsEnum } from 'src/common/enums/region.enum';

@Injectable()
export class UpdateToChaingmaiProvider {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly regionService: RegionServiceService,
  ) {}

  public async update() {
    const data = await this.bookingRepository.find({
      where: {
        id: In([31, 32]),
      },
      relations: ['to'],
    });
    const chinagrai = await this.regionService.findByRegion(
      'chiangrai' as RegionsEnum,
    );

    for (const element of data) {
      element.to = chinagrai;
      await this.bookingRepository.save(data);
    }
  }
}
