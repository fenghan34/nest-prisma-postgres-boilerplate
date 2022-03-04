import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UsersService } from '../users/users.service'
import { UtilsService } from '../utils/utils.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findUserByEmail(email)

    if (!user) return null

    if (await this.utilsService.compare(pass, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { name: user.name, email: user.email, sub: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
