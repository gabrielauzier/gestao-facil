import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/application/either'
import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'

import { Organization } from '../../enterprise/entities/organization'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { OrganizationsRepository } from '../repositories/organizations-repository'

type CreateOrganizationParams = {
  ownerId: string
  name: string
}

type CreateOrganizationResult = Either<null, { organization: Organization }>

@Injectable()
export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    ownerId,
    name,
  }: CreateOrganizationParams): Promise<CreateOrganizationResult> {
    const organization = Organization.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
      slug: Slug.createFromText(name),
    })

    const { createdId } =
      await this.organizationsRepository.create(organization)
    organization.overwriteId(createdId)

    return right({ organization })
  }
}
