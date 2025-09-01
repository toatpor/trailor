import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../region.entity';
import { Repository } from 'typeorm';
import { RegionsEnum } from '../../common/enums/region.enum';

@Injectable()
export class RegionFind {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  public async findAll() {
    return await this.regionRepository.find();
  }

  public async findByRegion(region: RegionsEnum) {
    return await this.regionRepository.findOneBy({ region });
  }
}
