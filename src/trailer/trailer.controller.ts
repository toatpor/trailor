import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTrailerDtos } from './dtos/create.trailer.dtos';
import { TrailerService } from './tralier.service';
import { UpdateTrailerDto } from './dtos/update.trailer.dtos';

@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Post()
  public async create(@Body() createTrailerDtos: CreateTrailerDtos) {
    return this.trailerService.create(createTrailerDtos);
  }

  @Get()
  public async findAll() {
    return this.trailerService.findAll();
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.trailerService.delete(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrailerDto: UpdateTrailerDto,
  ) {
    return this.trailerService.update(id, updateTrailerDto);
  }
}
