import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty()
  @IsOptional()
  @IsArray()
  tasks?: Prisma.UserCreateInput['tasks']
}
