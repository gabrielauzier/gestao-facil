import { HydratedDocument } from 'mongoose'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { Member } from '@/gestao-facil/organizations/enterprise/entities/member'

import { MongoMember } from '../schemas/mongo-member.schema'

export class MongoMemberMapper {
  static toDomain(raw: HydratedDocument<MongoMember>): Member {
    return Member.create(
      {
        userId: new UniqueEntityID(raw.user_id.toString()),
        organizationId: new UniqueEntityID(raw.organization_id.toString()),
        role: raw.role,
      },
      new UniqueEntityID(raw._id.toString()),
    )
  }

  static toMongo(data: Member): MongoMember {
    return {
      user_id: data.userId.toObjectID(),
      organization_id: data.organizationId.toObjectID(),
      role: data.role,
    }
  }
}
