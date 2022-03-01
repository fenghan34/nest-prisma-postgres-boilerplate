import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { createMockContext } from 'src/mocks/context'
import { DatabaseService } from '../database/database.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService
  let users: User[] = []

  beforeEach(async () => {
    const { prisma } = createMockContext()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: prisma,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
    users = []
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'getUsers').mockImplementation(async () => users)

      expect(await controller.getUsers({})).toBe(users)
    })
  })

  describe('findUserById', () => {
    it('should return specific user', async () => {
      jest
        .spyOn(service, 'findUserById')
        .mockImplementation(
          async (id) => users.find((user) => user.id === id) || null,
        )

      expect(await controller.findUserById(1)).toBeNull()
    })
  })

  describe('createUser', () => {
    it('should create new user', async () => {
      jest
        .spyOn(service, 'createUser')
        .mockImplementation(async (user: CreateUserDto) => {
          const newUser = { ...user, id: users.length }
          users.push(newUser)
          return newUser
        })

      const input = {
        name: 'Feng',
        email: 'hi@fenghan.link',
        password: '123',
      }

      expect(await controller.createUser(input)).toEqual(users[0])
    })
  })

  describe('updateUserById', () => {
    it('should update user info', async () => {
      jest
        .spyOn(service, 'updateUserById')
        .mockImplementation(async (id: number, { name }: UpdateUserDto) => {
          const user = users.find((user) => id === user.id)

          if (!user) {
            throw new Error('Not Found')
          }

          if (name) {
            user.name = name
          }

          return user
        })

      await expect(controller.updateUserById(1, {})).rejects.toEqual(
        new Error('Not Found'),
      )
    })
  })

  describe('deleteUserById', () => {
    it('should update user info', async () => {
      jest
        .spyOn(service, 'deleteUserById')
        .mockImplementation(async (id: number) => {
          const index = users.findIndex((user) => user.id === id)

          if (index <= -1) {
            throw new Error('Not Found')
          }

          users.splice(index, 1)
          return users[index]
        })

      await expect(controller.deleteUserById(1)).rejects.toEqual(
        new Error('Not Found'),
      )
    })
  })
})
