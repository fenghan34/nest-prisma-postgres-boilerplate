import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() query: GetUsersDto): Promise<User[]> {
    return this.usersService.getUsers(query)
  }

  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.usersService.findUserById(id)
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data)
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserById(id, data)
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUserById(id)
  }
}
