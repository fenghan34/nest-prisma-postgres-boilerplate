import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app.module'

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableShutdownHooks()

  const port = process.env.PORT || 3000

  const logger = new Logger()
  const docPath = 'api'

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(docPath, app, document)

  await app.listen(port)

  logger.verbose(`http://localhost:${port}/${docPath}`)

  return app
}
