import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailerEntity } from '../trailer.entity';
import { Repository } from 'typeorm';
import { Registration } from '../enum/registration.enum';

@Injectable()
export class TrailerFind {
  constructor(
    @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
  ) {}

  public async findAll() {
    return await this.trailerRepository.find();
  }

  public async findById(id: number) {
    return await this.trailerRepository.findOne({ where: { id } });
  }

  public async findByRegistration(registration: Registration) {
    return await this.trailerRepository.findOneBy({
      registration: registration,
    });
  }
}
