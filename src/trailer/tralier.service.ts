import { Injectable } from '@nestjs/common';
import { TrailerCreate } from './provider/trailer.create';
import { CreateTrailerDtos } from './dtos/create.trailer.dtos';
import { TrailerFind } from './provider/trailer.find';
import { TrailerDelete } from './provider/trailer.delete';
import { UpdateTrailerDto } from './dtos/update.trailer.dtos';
import { TrailerUpdate } from './provider/trailer.update';
import { Registration } from './enum/registration.enum';

@Injectable()
export class TrailerService {
  constructor(
    private readonly trailerCreate: TrailerCreate,
    private readonly trailerFind: TrailerFind,
    private readonly trailerUpdate: TrailerUpdate,
    private readonly trailerDelete: TrailerDelete,
  ) {}

  public create(createTrailerDtos: CreateTrailerDtos) {
    return this.trailerCreate.create(createTrailerDtos);
  }
  public findAll() {
    return this.trailerFind.findAll();
  }

  public findById(id: number) {
    return this.trailerFind.findById(id);
  }

  public findByRegistration(registration: Registration) {
    return this.trailerFind.findByRegistration(registration);
  }

  public delete(id: number) {
    return this.trailerDelete.deleteTrailer(id);
  }

  public update(id: number, updateTrailerDto: UpdateTrailerDto) {
    return this.trailerUpdate.update(id, updateTrailerDto);
  }
}
