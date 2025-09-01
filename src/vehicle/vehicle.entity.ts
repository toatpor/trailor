import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { brandCarEnum } from './enums/brand.enum';
import { formatInTimeZone } from 'date-fns-tz';
import { formatISO } from 'date-fns';
import { ClientBookingEntity } from 'src/client.booking/client.booking.entity';
import { Exclude } from 'class-transformer';

@Entity('vehicle')
export class VehicleEntity {
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
    type: 'enum',
    enum: brandCarEnum,
    nullable: false,
  })
  brand: brandCarEnum;

  @Column({ type: 'varchar', nullable: true })
  model: string;

  @Index('registration')
  @Column({
    type: 'varchar',
    length: 7,
    unique: true,
    nullable: false,
  })
  registration: string;

  @ManyToOne(() => UserEntity, (user) => user.vehicle)
  owner: UserEntity;

  @OneToMany(
    () => ClientBookingEntity,
    (clientBooking) => clientBooking.vehicle,
  )
  clientBooking: ClientBookingEntity[];
}
