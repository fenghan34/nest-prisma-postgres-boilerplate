import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { ConfigService } from '../config/config.service'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '7d',
      },
    }
  }
}
