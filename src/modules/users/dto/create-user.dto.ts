import { Prisma } from '@prisma/client'
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsOptional()
  @IsArray()
  tasks?: Prisma.UserCreateInput['tasks']
}
