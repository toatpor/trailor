import {
  Check,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSex } from './enums/sex.enum';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { Exclude } from 'class-transformer';
import { formatISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ClientBookingEntity } from 'src/client.booking/client.booking.entity';

@Entity('users')
@Check('age >= 18')
export class UserEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName: string;

  @Index('telNumber')
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 10,
  })
  tel: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    nullable: false,
  })
  sex: UserSex;

  @Column({
    type: 'int2',
    nullable: false,
    width: 4,
    default: 18,
  })
  age: number;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: formatISO(
      formatInTimeZone(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss'),
    ),
  })
  createDate: Date;

  @OneToMany(() => VehicleEntity, (vehicle) => vehicle.owner, { cascade: true })
  vehicle: VehicleEntity[];

  @OneToMany(() => ClientBookingEntity, (bookingDetail) => bookingDetail.user)
  bookingDetail: ClientBookingEntity[];
}
