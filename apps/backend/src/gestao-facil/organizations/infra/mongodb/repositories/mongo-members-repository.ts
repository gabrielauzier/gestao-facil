import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { MembersRepository } from '@/gestao-facil/organizations/application/repositories/members-repository'
import { Member } from '@/gestao-facil/organizations/enterprise/entities/member'

import { MongoMemberMapper } from '../mappers/mongo-member.mapper'
import { MongoMember, MongoMemberModel } from '../schemas/mongo-member.schema'

@Injectable()
export class MongoMembersRepository implements MembersRepository {
  constructor(
    @InjectModel(MongoMemberModel.name) private model: Model<MongoMember>,
  ) {}

  async findMembership(
    userId: string,
    organizationId: string,
  ): Promise<Member | null> {
    const membership = await this.model.findOne({
      user_id: new UniqueEntityID(userId).toObjectID(),
      organization_id: new UniqueEntityID(organizationId).toObjectID(),
    })

    if (!membership) {
      return null
    }

    return MongoMemberMapper.toDomain(membership)
  }

  async createMany(members: Member[]): Promise<void> {
    if (members.length === 0) return

    await this.model.create(members.map(MongoMemberMapper.toMongo))
  }

  async deleteMany(members: Member[]): Promise<void> {
    await this.model.deleteMany({
      user_id: {
        $in: members.map((member) => member.userId.toObjectID()),
      },
    })
  }
}
