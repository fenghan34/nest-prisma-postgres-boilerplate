import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { DatabaseService } from '../database/database.service'
import { GetUsersDto } from './dto/get-users.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async findUserById(id: number): Promise<User | null> {
    return this.findUser({ id })
  }

  async getUsers(params: GetUsersDto): Promise<User[]> {
    const { skip, take } = params

    return this.prisma.user.findMany({
      skip,
      take,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params

    return this.prisma.user.update({ data, where })
  }

  async updateUserById(id: number, data: UpdateUserDto): Promise<User> {
    return this.updateUser({ where: { id }, data })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }

  async deleteUserById(id: number): Promise<User> {
    return this.deleteUser({ id })
  }
}
