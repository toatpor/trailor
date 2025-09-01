import { Exclude } from 'class-transformer';
import { BookingEntity } from 'src/booking/booking.entity';
import { ClientBookingEntity } from 'src/client.booking/client.booking.entity';
import { DestinationEnum } from 'src/common/enums/destination.enum';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProvinceEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DestinationEnum,
    nullable: false,
    unique: true,
  })
  province: DestinationEnum;

  @OneToMany(() => ClientBookingEntity, (booking) => booking.pick)
  pick: ClientBookingEntity[];

  @OneToMany(() => ClientBookingEntity, (booking) => booking.drop)
  drop: ClientBookingEntity[];

  @ManyToMany(() => BookingEntity, (booking) => booking.province, {
    onDelete: 'CASCADE',
  })
  booking: BookingEntity[];
}
