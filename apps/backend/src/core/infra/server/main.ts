import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'

import { Env } from '@/core/infra/env/env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })
  const origins = configService.get('APP_ORIGINS', { infer: true })

  app.use(json({ limit: '50mb' }))

  app.enableCors({
    origin: origins,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(port, () => {
    Logger.log(`Listening at port ${port}`, 'NestApplication')
  })
}
bootstrap()
