import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../province.entity';
import { Repository } from 'typeorm';
import { UpdateProvinceDto } from '../dto/update.province.dto';

@Injectable()
export class UpdateProvinceProvider {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  public async updateProvince(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ) {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province)
      throw new ConflictException(
        'Please check province id, provide valid province id',
      );

    province.province = updateProvinceDto.province ?? province.province;

    try {
      await this.provinceRepository.save(province);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to connect to database this time',
        { description: 'Error connect to server' },
      );
    }

    return province;
  }
}
