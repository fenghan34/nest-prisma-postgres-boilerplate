import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { isDev } from './constants'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const port = process.env.PORT || 3000
  await app.listen(port)

  isDev && new Logger().verbose(`http://localhost:${port}`)
}

bootstrap()
