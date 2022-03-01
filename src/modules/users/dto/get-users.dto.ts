import { Prisma } from '@prisma/client'
import { IsNumber, IsObject, IsOptional } from 'class-validator'

export class GetUsersDto {
  @IsOptional()
  @IsNumber()
  skip?: number

  @IsOptional()
  @IsNumber()
  take?: number

  @IsOptional()
  @IsObject()
  cursor?: Prisma.UserWhereUniqueInput

  @IsOptional()
  @IsObject()
  where?: Prisma.UserWhereInput

  @IsOptional()
  @IsObject()
  orderBy?: Prisma.UserOrderByWithRelationInput
}
