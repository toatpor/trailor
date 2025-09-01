import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { DestinationEnum } from 'src/common/enums/destination.enum';

export class CreateManyProvinceDto {
  @IsArray()
  @IsEnum(DestinationEnum, { each: true })
  @IsNotEmpty()
  province: DestinationEnum[];
}
