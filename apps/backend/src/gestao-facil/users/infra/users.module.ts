import { Module } from '@nestjs/common'

import { RegisterUserUseCase } from '../application/use-cases/register-user'
import { RegisterUserController } from './http/controllers/register-user.controller'
import { MongoUsersModule } from './mongodb/mongo-users.module'

@Module({
  imports: [MongoUsersModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase],
})
export class UsersModule {}
