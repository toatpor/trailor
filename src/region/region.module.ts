import { Module } from '@nestjs/common';
import { RegionServiceService } from './region.service.service';
import { RegionController } from './region.controller';
import { RegionCreate } from './provider/region.create';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './region.entity';
import { RegionFind } from './provider/region.find';

@Module({
  providers: [RegionServiceService, RegionCreate, RegionFind],
  controllers: [RegionController],
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  exports: [RegionServiceService],
})
export class RegionModule {}
