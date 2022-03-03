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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUsersDto } from './dto/get-users.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users' })
  @Get()
  async getUsers(@Query() query: GetUsersDto): Promise<User[]> {
    return this.usersService.getUsers(query)
  }

  @ApiOperation({ summary: 'Get specific user profile' })
  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.usersService.findUserById(id)
  }

  @ApiOperation({ summary: 'Create new user' })
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data)
  }

  @ApiOperation({ summary: 'Update user info' })
  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserById(id, data)
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUserById(id)
  }
}
