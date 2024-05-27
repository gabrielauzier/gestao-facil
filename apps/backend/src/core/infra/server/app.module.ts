import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { OrganizationsModule } from '@/gestao-facil/organizations/infra/organizations.module'
import { UsersModule } from '@/gestao-facil/users/infra/users.module'

import { MongoModule } from '../database/mongodb/mongo.module'
import { envSchema } from '../env/env'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MongoModule,
    UsersModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
