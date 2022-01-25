import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseService } from './database.service'

describe('DatabaseService', () => {
  let service: DatabaseService
  let mockedConnect: jest.SpyInstance<Promise<void>, []>
  let mockedDisconnect: jest.SpyInstance<Promise<void>, []>

  beforeEach(async () => {
    mockedConnect = jest
      .spyOn(DatabaseService.prototype, '$connect')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(async () => {})

    mockedDisconnect = jest
      .spyOn(DatabaseService.prototype, '$disconnect')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(async () => {})

    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile()

    service = module.get(DatabaseService)
  })

  afterAll(async () => {
    mockedConnect.mockRestore()
    mockedDisconnect.mockRestore()
  })

  it('should connect and disconnect', async () => {
    expect(service).toBeDefined()

    await service.onModuleInit()
    await service.onModuleDestroy()

    expect(mockedConnect).toHaveBeenCalledTimes(1)
    expect(mockedDisconnect).toHaveBeenCalledTimes(1)
  })
})
