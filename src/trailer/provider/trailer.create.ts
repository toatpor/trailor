import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateTrailerDtos } from '../dtos/create.trailer.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailerEntity } from '../trailer.entity';
import { Repository } from 'typeorm';
import { subHours } from 'date-fns';

@Injectable()
export class TrailerCreate {
  constructor(
    @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
  ) {}

  public async create(createTrailerDtos: CreateTrailerDtos) {
    const data = this.trailerRepository.create({
      registration: createTrailerDtos.registration,
      actExpire: subHours(createTrailerDtos.actExpire, 7),
    });

    try {
      await this.trailerRepository.save(data);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }

    return data;
  }
}
