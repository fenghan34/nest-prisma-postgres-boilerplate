import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from 'src/modules/config/config.service'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: User) {
    const { id } = payload

    const user = await this.usersService.findUserById(id)

    return user
  }
}
