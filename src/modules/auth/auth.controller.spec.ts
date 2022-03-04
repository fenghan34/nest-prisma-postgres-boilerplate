import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { createMockContext, MockContext } from 'src/mocks/context'
import { ConfigModule } from '../config/config.module'
import { DatabaseService } from '../database/database.service'
import { UsersModule } from '../users/users.module'
import { UtilsModule } from '../utils/utils.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtConfigService } from './jwt-config.service'

describe('AuthController', () => {
  let controller: AuthController
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        UsersModule,
        UtilsModule,
      ],
      controllers: [AuthController],
      providers: [
        { provide: DatabaseService, useValue: ctx.prisma },
        AuthService,
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
