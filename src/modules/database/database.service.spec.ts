import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseService } from './database.service'

describe('DatabaseService', () => {
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile()

    databaseService = module.get<DatabaseService>(DatabaseService)
  })

  it('should connect and disconnect', async () => {
    expect(databaseService).toBeDefined()

    const mockedConnect = jest
      .spyOn(DatabaseService.prototype, '$connect')
      .mockImplementationOnce(async () => {
        //
      })

    const mockedDisconnect = jest
      .spyOn(DatabaseService.prototype, '$disconnect')
      .mockImplementationOnce(async () => {
        //
      })

    await databaseService.onModuleInit()
    await databaseService.onModuleDestroy()

    expect(mockedConnect).toHaveBeenCalledTimes(1)
    expect(mockedDisconnect).toHaveBeenCalledTimes(1)
  })
})
