import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class GetUsersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  skip?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  take?: number
}
