import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegionsEnum } from '../common/enums/region.enum';
import { BookingEntity } from 'src/booking/booking.entity';

@Entity('region')
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RegionsEnum,
    nullable: false,
    default: RegionsEnum.central,
    unique: true,
  })
  region: RegionsEnum;

  @OneToMany(() => BookingEntity, (from) => from.from)
  from?: BookingEntity[];

  @OneToMany(() => BookingEntity, (to) => to.to)
  to?: BookingEntity[];
}
