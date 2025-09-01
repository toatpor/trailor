import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteProvinceProvider {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  public async deleteProvince(id: number) {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province)
      throw new ConflictException(
        'Please check province id, provide valid province id',
      );

    try {
      await this.provinceRepository.delete(province);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to connect to database this time',
        { description: 'Error connect to server' },
      );
    }
    return { message: 'province delete successfully' };
  }
}
