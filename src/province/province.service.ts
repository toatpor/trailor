import { Injectable } from '@nestjs/common';
import { CreateManyProvinceProvider } from './provider/createMany.province.provider';
import { CreateManyProvinceDto } from './dto/createMany.province.dto';
import { CreateProvinceDto } from './dto/create.province.dto';
import { CreateProvinceProvider } from './provider/create.province.provider';
import { DeleteProvinceProvider } from './provider/delete.province.provider';
import { UpdateProvinceDto } from './dto/update.province.dto';
import { UpdateProvinceProvider } from './provider/update.province.provider';
import { FindProvinceProvider } from './provider/find.province.provider';
import { DestinationEnum } from 'src/common/enums/destination.enum';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly createManyProvinceProvider: CreateManyProvinceProvider,
    private readonly createProvinceProvider: CreateProvinceProvider,
    private readonly deleteProvinceProvider: DeleteProvinceProvider,
    private readonly findProvinceProvider: FindProvinceProvider,
    private readonly updateProvinceProvider: UpdateProvinceProvider,
  ) {}

  public createManyProvince(createProvinceDto: CreateManyProvinceDto) {
    return this.createManyProvinceProvider.createMany(createProvinceDto);
  }

  public create(createProvinceDto: CreateProvinceDto) {
    return this.createProvinceProvider.create(createProvinceDto);
  }

  public delete(id: number) {
    return this.deleteProvinceProvider.deleteProvince(id);
  }

  public update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return this.updateProvinceProvider.updateProvince(id, updateProvinceDto);
  }

  public findMultiple(province: number[]) {
    return this.findProvinceProvider.findMultipleProvince(province);
  }

  public findAll() {
    return this.findProvinceProvider.find();
  }

  public findByProvince(province: DestinationEnum) {
    return this.findProvinceProvider.findByProvince(province);
  }
}
