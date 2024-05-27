import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { MembersRepository } from '@/gestao-facil/organizations/application/repositories/members-repository'
import { OrganizationsRepository } from '@/gestao-facil/organizations/application/repositories/organizations-repository'
import { Organization } from '@/gestao-facil/organizations/enterprise/entities/organization'

import { MongoOrganizationMapper } from '../mappers/mongo-organization.mapper'
import {
  MongoOrganization,
  MongoOrganizationModel,
} from '../schemas/mongo-organization.schema'

@Injectable()
export class MongoOrganizationsRepository implements OrganizationsRepository {
  constructor(
    @InjectModel(MongoOrganizationModel.name)
    private organizationModel: Model<MongoOrganization>,
    private membersRepository: MembersRepository,
  ) {}

  async create(organization: Organization): Promise<{ createdId: string }> {
    const createdOrganization = await this.organizationModel.create(
      MongoOrganizationMapper.toMongo(organization),
    )

    await this.membersRepository.createMany(organization.members.getItems())

    return { createdId: createdOrganization._id.toString() }
  }

  async save(organization: Organization): Promise<void> {
    await this.organizationModel.findOneAndUpdate(
      { _id: organization.id.toString() },
      MongoOrganizationMapper.toMongo(organization),
    )

    await this.membersRepository.createMany(organization.members.getNewItems())

    await this.membersRepository.deleteMany(
      organization.members.getRemovedItems(),
    )
  }

  async findByOwnerId(ownerId: string): Promise<Organization | null> {
    const organization = await this.organizationModel.findOne({
      owner_id: ownerId,
    })

    if (!organization) {
      return null
    }

    return MongoOrganizationMapper.toDomain(organization)
  }

  async findById(organizationId: string): Promise<Organization | null> {
    const organization = await this.organizationModel.findById(
      new UniqueEntityID(organizationId).toObjectID(),
    )

    if (!organization) {
      return null
    }

    return MongoOrganizationMapper.toDomain(organization)
  }
}
