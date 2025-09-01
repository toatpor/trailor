import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from '../dto/create.province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateProvinceProvider {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}
  public async create(createProvinceDto: CreateProvinceDto) {
    const province = this.provinceRepository.create({ ...createProvinceDto });
    this.provinceRepository.save(province);
  }
}
