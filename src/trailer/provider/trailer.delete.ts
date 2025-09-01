import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailerEntity } from '../trailer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrailerDelete {
  constructor(
    @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
  ) {}

  public async deleteTrailer(id: number) {
    const trailer = await this.trailerRepository.findOne({ where: { id } });

    if (!trailer)
      throw new ConflictException(
        'Please check trailer Id. Please provide valid ID',
      );

    await this.trailerRepository.delete(trailer);

    return { message: 'Trailer success deleted' };
  }
}
