import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../region.entity';
import { Repository } from 'typeorm';
import { RegionCreateDto } from '../dtos/region.create.dto';

@Injectable()
export class RegionCreate {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  public async create(regionCreateDto: RegionCreateDto) {
    const data = this.regionRepository.create({ ...regionCreateDto });

    try {
      await this.regionRepository.save(data);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }
  }
}
