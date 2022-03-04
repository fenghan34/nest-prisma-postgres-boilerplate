import { CacheModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpCacheInterceptor } from 'src/interceptors/cache.interceptor'
import { ValidationPipe } from 'src/pipes/validation-pipe.pipe'
import { AuthModule } from './auth/auth.module'
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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
