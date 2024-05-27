import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersRepository } from '../../application/repositories/users-repository'
import { MongoUsersRepository } from './repositories/mongo-users-repository'
import { MongoUserModel } from './schemas/mongo-user.schema'

@Module({
  imports: [MongooseModule.forFeature([MongoUserModel])],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class MongoUsersModule {}
