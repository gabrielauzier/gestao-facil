import { MongooseModule } from '@nestjs/mongoose'
import { Logger, Module } from '@nestjs/common'

import { EnvService } from '@/core/infra/env/env.service'
import { EnvModule } from '@/core/infra/env/env.module'
import { MongoMemoryServer } from 'mongodb-memory-server'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (env: EnvService) => {
        if (env.get('NODE_ENV') === 'test') {
          const mongoInMemory = await MongoMemoryServer.create()
          const mongoInMemoryURI = mongoInMemory.getUri()

          return {
            uri: mongoInMemoryURI,
          }
        }

        const URI = env.get('DATABASE_URL')
        Logger.debug(`Mongo @ ${URI}`, 'MongooseModule')
        return { uri: URI }
      },
    }),
  ],
})
export class MongoModule {}
