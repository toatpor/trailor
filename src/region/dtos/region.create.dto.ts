import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RegionsEnum } from '../../common/enums/region.enum';

export class RegionCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(RegionsEnum)
  region: RegionsEnum;
}
