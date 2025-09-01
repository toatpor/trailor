import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async findUserByPhoneNumber(phone: string) {
    return await this.userRepository.findOneBy({ tel: phone });
  }
}
