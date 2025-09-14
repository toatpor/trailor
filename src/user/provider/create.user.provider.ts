import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create.user.dtos';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        // name: createUserDto.name,
        tel: createUserDto.tel,
        // lastName: createUserDto.lastName,
      },
    });

    if (existUser)
      throw new BadRequestException(
        'The user already exist, Please provide or check your phone number',
      );

    const data = this.userRepository.create({
      name: createUserDto.name,
      lastName: createUserDto.lastName,
      tel: createUserDto.tel,
      age: createUserDto.age
        ? new Date().getFullYear() - createUserDto.age
        : 18,
      sex: createUserDto.sex,
    });

    try {
      await this.userRepository.save(data);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        { description: 'Error connect to server' },
      );
    }

    return data;
  }
}
