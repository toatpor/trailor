import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dtos';
import { CreateUserProvider } from './provider/create.user.provider';
import { DeleteUserProvider } from './provider/delete.user.provider';
import { UpdateUserDto } from './dtos/update.user.dtos';
import { UpdateUserProvider } from './provider/update.user.provider';
import { FindUserProvider } from './provider/find.user.provider';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly deleteUserProvider: DeleteUserProvider,
    private readonly updateUserProvider: UpdateUserProvider,
    private readonly findUserProvider: FindUserProvider,
  ) {}

  // create customer
  public async createCustomer(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async deleteCustomer(id: number) {
    return this.deleteUserProvider.deleteUser(id);
  }

  public async updateCustomer(id: number, updateUserDto: UpdateUserDto) {
    return this.updateUserProvider.updateUser(id, updateUserDto);
  }

  public async findUserById(id: number) {
    return this.findUserProvider.findUserById(id);
  }

  public async findUserBytel(tel: string) {
    return this.findUserProvider.findUserByPhoneNumber(tel);
  }
}
