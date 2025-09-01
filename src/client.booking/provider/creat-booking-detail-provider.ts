import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientBookingDto } from '../dtos/client.booking.dto';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { ClientBookingEntity } from '../client.booking.entity';
import { BookingEntity } from 'src/booking/booking.entity';
import { ProvinceEntity } from 'src/province/province.entity';

@Injectable()
export class CreateBookingDetailProvider {
  constructor(private readonly datasource: DataSource) {}
  public async create(clientBookingDto: ClientBookingDto) {
    let user: UserEntity;
    let vehicle: VehicleEntity;

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    user = await queryRunner.manager.findOne(UserEntity, {
      where: { tel: clientBookingDto.tel, name: clientBookingDto.name },
    });

    if (!user) {
      user = queryRunner.manager.create(UserEntity, {
        name: clientBookingDto.name,
        lastName: clientBookingDto.lastName,
        age: new Date().getFullYear() - clientBookingDto.age,
        sex: clientBookingDto.sex,
        tel: clientBookingDto.tel,
      });

      user = await queryRunner.manager.save(user);
    }

    vehicle = await queryRunner.manager.findOne(VehicleEntity, {
      where: { registration: clientBookingDto.registration },
    });

    if (!vehicle) {
      vehicle = queryRunner.manager.create(VehicleEntity, {
        model: clientBookingDto.model,
        brand: clientBookingDto.brand,
        registration: clientBookingDto.registration,
        owner: user,
      });

      vehicle = await queryRunner.manager.save(vehicle);
    }

    const booking = await queryRunner.manager.findOne(BookingEntity, {
      where: {
        id: clientBookingDto.booking,
      },
    });

    if (!booking) {
      throw new BadRequestException(
        'Please check booking id, Provide valid id',
      );
    } else if (booking.capacity >= 8) {
      throw new BadRequestException('Capacity should not greater than 8');
    }

    booking.capacity = booking.capacity + (clientBookingDto.isBig ? 2 : 1);
    booking.deposit = clientBookingDto.transit
      ? booking.deposit
      : booking.deposit + 500;

    await queryRunner.manager.save(booking);

    const pick = await queryRunner.manager.findOne(ProvinceEntity, {
      where: { province: clientBookingDto.pick },
    });

    const drop = await queryRunner.manager.findOne(ProvinceEntity, {
      where: { province: clientBookingDto.drop },
    });

    const bookingDetail = queryRunner.manager.create(ClientBookingEntity, {
      ...clientBookingDto,
      pick,
      drop,
      user,
      booking,
      vehicle,
    });
    await queryRunner.manager.save(bookingDetail);

    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (_error) {
        throw new RequestTimeoutException(
          'Could not release the query runner connection',
        );
      }
    }
  }
}
