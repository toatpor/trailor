import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegionCreateDto } from './dtos/region.create.dto';
import { RegionServiceService } from './region.service.service';
import { RegionsEnum } from '../common/enums/region.enum';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionServiceService) {}

  @Post()
  public regionCreate(@Body() regionCreateDto: RegionCreateDto) {
    return this.regionService.create(regionCreateDto);
  }

  @Get('/:region')
  public findByRegion(@Param('region') region: RegionsEnum) {
    return this.regionService.findByRegion(region);
  }
}
