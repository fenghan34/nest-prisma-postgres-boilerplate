import { ExecutionContext } from '@nestjs/common'
import { HttpCacheInterceptor } from './cache.interceptor'

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
}

const interceptor = new HttpCacheInterceptor({}, {})

describe('HttpCacheInterceptor', () => {
  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  describe('#interceptor', () => {
    it('should return undefined', async () => {
      const request = { method: 'POST' }

      executionContext.switchToHttp().getRequest.mockReturnValueOnce(request)

      const actualValue = interceptor.trackBy(
        executionContext as unknown as ExecutionContext,
      )

      expect(actualValue).toBeUndefined()
    })

    it('should return cached url', async () => {
      const request = { method: 'GET', url: '/users' }

      executionContext.switchToHttp().getRequest.mockReturnValueOnce(request)

      const actualValue = interceptor.trackBy(
        executionContext as unknown as ExecutionContext,
      )

      expect(actualValue).toBe(request.url)
    })
  })
})
