import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateManyProvinceDto } from './dto/createMany.province.dto';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create.province.dto';
import { UpdateProvinceDto } from './dto/update.province.dto';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post('/many')
  public createManyProvince(
    @Body() createManyProvinceDto: CreateManyProvinceDto,
  ) {
    return this.provinceService.createManyProvince(createManyProvinceDto);
  }

  @Post()
  public createProvince(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provinceService.create(createProvinceDto);
  }

  @Delete('/:id')
  public deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.delete(id);
  }

  @Patch('/:id')
  public updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provinceService.update(id, updateProvinceDto);
  }

  @Get()
  public getAllProvince() {
    return this.provinceService.findAll();
  }
}
