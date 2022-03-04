import { Test, TestingModule } from '@nestjs/testing'
import { createMockContext, MockContext } from 'src/mocks/context'
import { DatabaseService } from '../database/database.service'
import { UtilsService } from '../utils/utils.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
        UsersService,
        { provide: DatabaseService, useValue: ctx.prisma },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findUser', () => {
    it('should return null', async () => {
      ctx.prisma.user.findUnique.mockResolvedValue(null)

      expect(await service.findUser({ id: 1 })).toBeNull()
    })
  })

  describe('findUserById', () => {
    it('should return null', async () => {
      jest.spyOn(service, 'findUser').mockImplementationOnce(async () => null)
      expect(await service.findUserById(1)).toBeNull()
    })
  })

  describe('findUserByEmail', () => {
    it('should return null', async () => {
      jest.spyOn(service, 'findUser').mockImplementationOnce(async () => null)
      expect(await service.findUserByEmail('hi@fenghan.link')).toBeNull()
    })
  })

  describe('getUsers', () => {
    it('should return and array of users', async () => {
      ctx.prisma.user.findMany.mockResolvedValue([])

      expect(await service.getUsers({})).toEqual([])
    })
  })

  describe('createUser', () => {
    it('should create new user', async () => {
      const user = {
        name: 'Feng',
        email: 'hi@fenghan.link',
        password: '123',
      }

      const result = { ...user, id: 1 }
      ctx.prisma.user.create.mockResolvedValue(result)

      expect(await service.createUser(user)).toEqual(result)
    })
  })

  describe('updateUser', () => {
    it('should update username', async () => {
      const user = {
        id: 1,
        name: 'Feng',
        email: 'hi@fenghan.link',
        password: '123',
      }

      const result = { ...user, name: 'Feng Han' }
      ctx.prisma.user.update.mockResolvedValue(result)

      expect(
        await service.updateUser({
          where: { id: 1 },
          data: { name: 'Feng Han' },
        }),
      ).toEqual(result)
    })
  })

  describe('updateUserById', () => {
    it('should update username', async () => {
      const result = {
        id: 1,
        name: 'Feng Han',
        email: 'hi@fenghan.link',
        password: '123',
      }

      jest
        .spyOn(service, 'updateUser')
        .mockImplementationOnce(async () => result)

      expect(await service.updateUserById(1, { name: 'Feng Han' })).toEqual(
        result,
      )
    })
  })

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const result = {
        id: 1,
        name: 'Feng',
        email: 'hi@fenghan.link',
        password: '123',
      }

      ctx.prisma.user.delete.mockResolvedValue(result)

      expect(await service.deleteUser({ id: 1 })).toEqual(result)
    })
  })

  describe('deleteUserById', () => {
    it('should update username', async () => {
      const user = {
        id: 1,
        name: 'Feng Han',
        email: 'hi@fenghan.link',
        password: '123',
      }

      jest.spyOn(service, 'deleteUser').mockImplementationOnce(async () => user)

      expect(await service.deleteUserById(1)).toEqual(user)
    })
  })
})
