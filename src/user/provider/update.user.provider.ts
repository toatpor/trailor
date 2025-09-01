import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/update.user.dtos';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new BadRequestException(
        'Please check your user id, provide exist user id',
      );

    user.name = updateUserDto?.name ?? user.name;
    user.lastName = updateUserDto?.lastName ?? user.lastName;
    user.sex = updateUserDto?.sex ?? user.sex;
    user.tel = updateUserDto?.tel ?? user.tel;
    user.age = new Date().getFullYear() - updateUserDto?.age || user.age;

    try {
      await this.userRepository.save(user);
    } catch (_error) {
      throw new RequestTimeoutException(
        'unable to process your request at this moment, Please try again later',
        { description: 'Error connection to database' },
      );
    }

    return user;
  }
}
