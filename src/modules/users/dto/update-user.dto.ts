import { Prisma } from '@prisma/client'
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsArray()
  tasks?: Prisma.UserCreateInput['tasks']
}
