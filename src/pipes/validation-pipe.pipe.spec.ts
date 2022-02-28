import { IsString } from 'class-validator'
import { ValidationPipe } from './validation-pipe.pipe'

const validationPipe = new ValidationPipe()

class User {
  @IsString()
  username: string

  @IsString()
  password: string
}

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(validationPipe).toBeDefined()
  })

  it('should pass validation', async () => {
    const value1 = {}
    expect(await validationPipe.transform(value1, { type: 'body' })).toEqual(
      value1,
    )

    const value2 = new Map()
    expect(
      await validationPipe.transform(value2, {
        type: 'body',
        metatype: String,
      }),
    ).toEqual(value2)

    const value3 = { username: '', password: '' }
    expect(
      await validationPipe.transform(value3, {
        type: 'body',
        metatype: User,
      }),
    ).toEqual(value3)
  })

  it('should validate failed', async () => {
    await expect(
      validationPipe.transform({}, { type: 'body', metatype: User }),
    ).rejects.toBeObject()
  })
})
