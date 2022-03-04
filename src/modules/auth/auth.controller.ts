import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Request as ExpressRequest } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest & { user: User }) {
    return this.authService.login(req.user)
  }
}
