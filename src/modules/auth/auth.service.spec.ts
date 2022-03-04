import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { createMockContext, MockContext } from 'src/mocks/context'
import { ConfigModule } from '../config/config.module'
import { DatabaseService } from '../database/database.service'
import { UsersModule } from '../users/users.module'
import { UtilsModule } from '../utils/utils.module'
import { AuthService } from './auth.service'
import { JwtConfigService } from './jwt-config.service'

describe('AuthService', () => {
  let service: AuthService
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
      providers: [
        { provide: DatabaseService, useValue: ctx.prisma },
        AuthService,
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
