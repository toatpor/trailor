import { Exclude } from 'class-transformer';
import { formatISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { BookingEntity } from 'src/booking/booking.entity';
import { ProvinceEntity } from 'src/province/province.entity';
import { UserEntity } from 'src/user/user.entity';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detail')
export class ClientBookingEntity {
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
    type: 'text',
    nullable: true,
  })
  remark?: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.clientBooking)
  booking: BookingEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.clientBooking)
  vehicle: VehicleEntity;

  @ManyToOne(() => UserEntity, (user) => user.bookingDetail)
  user: UserEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.pick)
  pick: ProvinceEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.drop)
  drop: ProvinceEntity;
}
