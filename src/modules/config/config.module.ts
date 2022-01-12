import { DynamicModule, Module } from '@nestjs/common'
import { InjectionTokens } from 'src/constants'
import { ConfigService } from './config.service'
import { ConfigOptions } from './interface'

@Module({
  providers: [ConfigService],
})
export class ConfigModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: InjectionTokens.CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    }
  }
}
