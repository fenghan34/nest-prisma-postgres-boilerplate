import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Inject,
  Injectable,
} from '@nestjs/common'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { InjectionTokens } from 'src/constants'
import { Config, ConfigOptions } from './interface'

@Injectable()
export class ConfigService implements CacheOptionsFactory {
  private readonly config: Config = {}

  constructor(
    @Inject(InjectionTokens.CONFIG_OPTIONS)
    private options: Required<ConfigOptions>,
  ) {
    const { loadEnvFile, folderPath } = options

    if (loadEnvFile) {
      const fileName = `.env.${process.env.NODE_ENV || 'development'}`
      const envFile = path.join(folderPath, fileName)

      dotenv.config({ path: envFile })

      this.config = dotenv.parse(fs.readFileSync(envFile))
    } else {
      this.config = process.env
    }
  }

  get(key: keyof Config) {
    return this.config[key]
  }

  createCacheOptions(): CacheModuleOptions<Record<string, any>> {
    return {
      isGlobal: true,
      max: Number(this.get('CACHE_MAX_ITEMS')) || 10,
      ttl: Number(this.get('CACHE_TTL')) || 5,
    }
  }
}
