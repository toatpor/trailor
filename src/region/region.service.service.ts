import { Injectable } from '@nestjs/common';
import { RegionCreateDto } from './dtos/region.create.dto';
import { RegionCreate } from './provider/region.create';
import { RegionFind } from './provider/region.find';
import { RegionsEnum } from '../common/enums/region.enum';

@Injectable()
export class RegionServiceService {
  constructor(
    private readonly regionCreate: RegionCreate,
    private readonly regionFind: RegionFind,
  ) {}

  public create(regionCreateDto: RegionCreateDto) {
    return this.regionCreate.create(regionCreateDto);
  }

  public findAll() {
    return this.regionFind.findAll();
  }

  public findByRegion(region: RegionsEnum) {
    return this.regionFind.findByRegion(region);
  }
}
