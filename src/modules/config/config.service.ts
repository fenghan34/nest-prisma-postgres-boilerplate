import { Inject, Injectable } from '@nestjs/common'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { InjectionTokens } from 'src/constants'
import { ConfigOptions, EnvConfig } from './interface'

@Injectable()
export class ConfigService {
  private readonly config: EnvConfig = {}

  constructor(
    @Inject(InjectionTokens.CONFIG_OPTIONS)
    private options: ConfigOptions,
  ) {
    const { folderPath } = options
    const fileName = `.env.${process.env.NODE_ENV || 'development'}`
    const envFile = path.join(folderPath, fileName)

    this.config = dotenv.parse(fs.readFileSync(envFile))
  }

  get(key: keyof EnvConfig) {
    return this.config[key]
  }
}
