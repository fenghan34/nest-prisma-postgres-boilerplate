import { CacheInterceptor, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request>()

    const requestUrl = request.url
    const isGetRequest = request.method === 'GET'

    // Routes to be excluded, which won't be cached
    const excludePaths: string[] = []

    if (isGetRequest && !excludePaths.includes(requestUrl)) {
      return requestUrl
    }
  }
}
