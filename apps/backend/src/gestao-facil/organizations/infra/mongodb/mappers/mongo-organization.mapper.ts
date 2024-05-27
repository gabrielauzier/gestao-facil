import { HydratedDocument } from 'mongoose'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { Organization } from '@/gestao-facil/organizations/enterprise/entities/organization'
import { Slug } from '@/gestao-facil/organizations/enterprise/entities/value-objects/slug'

import { MongoOrganization } from '../schemas/mongo-organization.schema'

export class MongoOrganizationMapper {
  static toDomain(raw: HydratedDocument<MongoOrganization>): Organization {
    return Organization.create(
      {
        name: raw.name,
        ownerId: new UniqueEntityID(raw.owner_id.toString()),
        slug: Slug.create(raw.slug),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw._id.toString()),
    )
  }

  static toMongo(organization: Organization): MongoOrganization {
    return {
      name: organization.name,
      owner_id: organization.ownerId.toObjectID(),
      slug: organization.slug.value,
      created_at: organization.createdAt,
      updated_at: organization.updatedAt,
    }
  }
}
