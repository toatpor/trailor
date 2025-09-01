import { Module } from '@nestjs/common';
import { TrailerController } from './trailer.controller';

import { TrailerCreate } from './provider/trailer.create';
import { TrailerService } from './tralier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailerEntity } from './trailer.entity';
import { TrailerFind } from './provider/trailer.find';
import { TrailerDelete } from './provider/trailer.delete';
import { TrailerUpdate } from './provider/trailer.update';

@Module({
  controllers: [TrailerController],
  providers: [
    TrailerCreate,
    TrailerService,
    TrailerFind,
    TrailerDelete,
    TrailerUpdate,
  ],
  imports: [TypeOrmModule.forFeature([TrailerEntity])],
  exports: [TrailerService],
})
export class TrailerModule {}
