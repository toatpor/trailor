import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../province.entity';
import { In, Repository } from 'typeorm';
import { DestinationEnum } from 'src/common/enums/destination.enum';

@Injectable()
export class FindProvinceProvider {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  public async find() {
    return await this.provinceRepository.find();
  }

  public async findMultipleProvince(province: number[]) {
    return await this.provinceRepository.find({ where: { id: In(province) } });
  }

  public async findByProvince(province: DestinationEnum) {
    return await this.provinceRepository.findOneBy({ province });
  }
}
