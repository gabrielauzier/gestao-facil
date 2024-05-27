import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/application/either'
import { ResourceNotFoundError } from '@/core/domain/errors/errors/resource-not-found-error'

import { Organization } from '../../enterprise/entities/organization'
import { OrganizationsRepository } from '../repositories/organizations-repository'

type UpdateOrganizationParams = {
  organizationId: string
  name: string
  membersIds: string[]
}

type UpdateOrganizationResult = Either<
  ResourceNotFoundError,
  { organization: Organization }
>

@Injectable()
export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
    name,
    membersIds,
  }: UpdateOrganizationParams): Promise<UpdateOrganizationResult> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    organization.name = name

    await this.organizationsRepository.save(organization)

    return right({ organization })
  }
}
