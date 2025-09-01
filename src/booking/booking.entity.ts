import { formatISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import {
  Check,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './enums/booking.status';
import { TrailerEntity } from 'src/trailer/trailer.entity';
import { ClientBookingEntity } from 'src/client.booking/client.booking.entity';
import { Exclude } from 'class-transformer';
import { RegionEntity } from 'src/region/region.entity';
import { ProvinceEntity } from 'src/province/province.entity';

@Entity('booking')
@Check('capacity <= 8')
@Check('capacity >= 0')
export class BookingEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: formatISO(
      formatInTimeZone(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss'),
    ),
    nullable: false,
  })
  createDate: Date;

  @Column({
    type: 'timestamp',
    default: new Date(),
    nullable: false,
  })
  departureDate: Date;

  @Column({
    type: 'timestamp',
    default: new Date(),
    nullable: false,
  })
  arriveDate: Date;

  @Column({
    type: 'int2',
    default: 0,
    nullable: false,
    width: 1,
  })
  capacity: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.pending,
    nullable: false,
  })
  status: BookingStatus;

  @ManyToOne(() => RegionEntity, (region) => region.from)
  from: RegionEntity;

  @ManyToOne(() => RegionEntity, (region) => region.to)
  to: RegionEntity;

  @Column({
    type: 'int2',
    nullable: true,
    default: 0,
  })
  deposit: number;

  @ManyToOne(() => TrailerEntity, (trailer) => trailer.booking)
  trailer: TrailerEntity;

  @OneToMany(
    () => ClientBookingEntity,
    (clientBooking) => clientBooking.booking,
  )
  clientBooking: ClientBookingEntity[];

  @ManyToMany(() => ProvinceEntity, (province) => province.booking)
  @JoinTable({
    name: 'destination',
    joinColumn: { name: 'booking' },
    inverseJoinColumn: { name: 'province' },
  })
  province: ProvinceEntity[];
}
