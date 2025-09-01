import { formatInTimeZone } from 'date-fns-tz';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Registration } from './enum/registration.enum';
import { addHours } from 'date-fns';
import { BookingEntity } from 'src/booking/booking.entity';
import { Exclude } from 'class-transformer';

@Entity('trailer')
export class TrailerEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: formatInTimeZone(
      addHours(new Date(), 7),
      'Asia/Bangkok',
      'yyyy-MM-dd HH:mm:ss',
    ),
    nullable: false,
  })
  createDate: Date;

  @Column({
    unique: true,
    type: 'enum',
    enum: Registration,
    nullable: false,
  })
  registration: Registration;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: formatInTimeZone(
      new Date(),
      'Asia/Bangkok',
      'yyyy-MM-dd HH:mm:ss',
    ),
  })
  actExpire: Date;

  @OneToMany(() => BookingEntity, (booking) => booking.trailer)
  booking: BookingEntity;
}
