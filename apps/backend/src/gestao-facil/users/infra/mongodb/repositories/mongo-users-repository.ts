import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UsersRepository } from '@/gestao-facil/users/application/repositories/users-repository'
import { User } from '@/gestao-facil/users/enterprise/entities/user'

import { MongoUserMapper } from '../mappers/mongo-user.mapper'
import { MongoUser, MongoUserModel } from '../schemas/mongo-user.schema'

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(MongoUserModel.name) private model: Model<MongoUser>,
  ) {}

  async create(user: User): Promise<{ createdId: string }> {
    const createdUser = await this.model.create(MongoUserMapper.toMongo(user))

    return { createdId: createdUser._id.toString() }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email })

    if (!user) {
      return null
    }

    return MongoUserMapper.toDomain(user)
  }
}
