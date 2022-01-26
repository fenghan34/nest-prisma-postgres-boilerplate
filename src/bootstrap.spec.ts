/* eslint-disable @typescript-eslint/no-empty-function */
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { bootstrap } from './bootstrap'
import { DatabaseService } from './modules/database/database.service'

Logger.overrideLogger(false)

describe('bootstrap', () => {
  it('should create nest app', async () => {
    const connectDatabase = jest
      .spyOn(DatabaseService.prototype, '$connect')
      .mockImplementationOnce(async () => {})

    const disconnectDatabase = jest
      .spyOn(DatabaseService.prototype, '$disconnect')
      .mockImplementationOnce(async () => {})

    const create = jest.spyOn(NestFactory, 'create')

    const app = await bootstrap()

    expect(create).toHaveBeenCalledTimes(1)
    expect(connectDatabase).toHaveBeenCalledTimes(1)

    await app.close()

    expect(disconnectDatabase).toHaveBeenCalledTimes(1)
  })
})
