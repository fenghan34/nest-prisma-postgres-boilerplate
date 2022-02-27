import { CacheModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpCacheInterceptor } from 'src/interceptors/cache.interceptor'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.registerAsync({
      useExisting: ConfigService,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
