import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new ConflictException(
        'Please check user id, this user id does not exist',
      );

    //  [multiple delete], {name: value} condition
    await this.userRepository.delete(id);
    return {
      message: 'User was deleted',
    };
  }
}
