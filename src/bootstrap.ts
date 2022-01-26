import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { isDev } from './constants'
import { AppModule } from './modules/app.module'

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableShutdownHooks()

  const port = process.env.PORT || 3000
  await app.listen(port)

  isDev && new Logger().verbose(`http://localhost:${port}`)

  return app
}
