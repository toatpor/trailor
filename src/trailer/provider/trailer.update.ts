import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailerEntity } from '../trailer.entity';
import { Repository } from 'typeorm';
import { UpdateTrailerDto } from '../dtos/update.trailer.dtos';

@Injectable()
export class TrailerUpdate {
  constructor(
    @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
  ) {}

  public async update(id: number, updateTrailerDto: UpdateTrailerDto) {
    const trailer = await this.trailerRepository.findOne({ where: { id } });
    if (!trailer)
      throw new BadRequestException(
        'Please check your trailer id, Provide valid id',
      );

    trailer.actExpire =
      (updateTrailerDto.actExpire as unknown as Date) ?? trailer.actExpire;

    try {
      this.trailerRepository.save(trailer);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }
    return trailer;
  }
}
