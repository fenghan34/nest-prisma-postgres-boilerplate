import { Module } from '@nestjs/common'
import { configFolderPath } from 'src/constants'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.register({ folderPath: configFolderPath }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
