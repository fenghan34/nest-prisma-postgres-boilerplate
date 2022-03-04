import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { UtilsModule } from '../utils/utils.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [DatabaseModule, UtilsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
