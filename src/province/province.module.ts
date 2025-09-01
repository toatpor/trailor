import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { CreateManyProvinceProvider } from './provider/createMany.province.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from './province.entity';
import { CreateProvinceProvider } from './provider/create.province.provider';
import { DeleteProvinceProvider } from './provider/delete.province.provider';
import { UpdateProvinceProvider } from './provider/update.province.provider';
import { FindProvinceProvider } from './provider/find.province.provider';

@Module({
  controllers: [ProvinceController],
  providers: [
    ProvinceService,
    CreateManyProvinceProvider,
    CreateProvinceProvider,
    DeleteProvinceProvider,
    UpdateProvinceProvider,
    FindProvinceProvider,
  ],
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  exports: [ProvinceService],
})
export class ProvinceModule {}
