import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/application/either'
import { ResourceNotFoundError } from '@/core/domain/errors/errors/resource-not-found-error'

import { Organization } from '../../enterprise/entities/organization'
import { OrganizationsRepository } from '../repositories/organizations-repository'

type FindOrganizationByOwnerIdParams = {
  ownerId: string
}

type FindOrganizationByOwnerIdResult = Either<
  ResourceNotFoundError,
  { organization: Organization }
>

@Injectable()
export class FindOrganizationByOwnerIdUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    ownerId,
  }: FindOrganizationByOwnerIdParams): Promise<FindOrganizationByOwnerIdResult> {
    const organization =
      await this.organizationsRepository.findByOwnerId(ownerId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    return right({ organization })
  }
}
