import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.user.dtos';
import { UpdateUserDto } from './dtos/update.user.dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createCustomer')
  public async createCustomer(@Body() createUserDto: CreateUserDto) {
    return this.userService.createCustomer(createUserDto);
  }

  @Delete('deleteCustomer/:id')
  public async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteCustomer(id);
  }

  @Patch('updateCustomer/:id')
  public async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateCustomer(id, updateUserDto);
  }
}
