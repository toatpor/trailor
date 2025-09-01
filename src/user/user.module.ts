import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserProvider } from './provider/create.user.provider';
import { DeleteUserProvider } from './provider/delete.user.provider';
import { UpdateUserProvider } from './provider/update.user.provider';
import { FindUserProvider } from './provider/find.user.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserProvider,
    DeleteUserProvider,
    UpdateUserProvider,
    FindUserProvider,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule {}
