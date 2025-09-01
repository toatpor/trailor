import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DestinationEnum } from 'src/common/enums/destination.enum';

export class CreateProvinceDto {
  @IsEnum(DestinationEnum)
  @IsString()
  @IsNotEmpty()
  province: DestinationEnum;
}
