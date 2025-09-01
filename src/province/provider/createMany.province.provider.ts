import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../province.entity';
import { Repository } from 'typeorm';
import { CreateManyProvinceDto } from '../dto/createMany.province.dto';

@Injectable()
export class CreateManyProvinceProvider {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  public async createMany(createProvinceDto: CreateManyProvinceDto) {
    for (const province of createProvinceDto.province) {
      const newProvince = this.provinceRepository.create({
        province,
      });
      await this.provinceRepository.save(newProvince);
    }
    return { message: 'create province success' };
  }
}
