import { CacheInterceptor, ExecutionContext } from '@nestjs/common'

export class HttpCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest()
    const { httpAdapter } = this.httpAdapterHost
    const requestUrl = httpAdapter.getRequestUrl(request)

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET'

    // Routes to be excluded, which won't be cached
    const excludePaths: string[] = []

    if (!isGetRequest || (isGetRequest && excludePaths.includes(requestUrl))) {
      return undefined
    }

    return requestUrl
  }
}
