import { HydratedDocument } from 'mongoose'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { User } from '@/gestao-facil/users/enterprise/entities/user'

import { MongoUser } from '../schemas/mongo-user.schema'

export class MongoUserMapper {
  static toDomain(raw: HydratedDocument<MongoUser>): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw._id.toString()),
    )
  }

  static toMongo(user: User): MongoUser {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }
  }
}
