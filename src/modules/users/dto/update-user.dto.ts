import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tasks?: Prisma.UserCreateInput['tasks']
}
