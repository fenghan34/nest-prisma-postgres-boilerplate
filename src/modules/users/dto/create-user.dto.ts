import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ example: 'Feng Han' })
  @IsString()
  name: string

  @ApiProperty({ example: 'hi@fenghan.link' })
  @IsEmail()
  email: string

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string
}
