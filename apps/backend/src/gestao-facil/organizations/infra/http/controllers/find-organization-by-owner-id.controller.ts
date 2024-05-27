import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ObjectIdValidationPipe } from '@/core/infra/pipes/object-id-validation-pipe'
import { FindOrganizationByOwnerIdUseCase } from '@/gestao-facil/organizations/application/use-cases/find-organization-by-owner-id'

import {} from '../validation/dtos/create-organization.dto'

@Controller('/organizations/:ownerId')
export class FindOrganizationByOwnerIdController {
  constructor(
    private findOrganizationByOwnerId: FindOrganizationByOwnerIdUseCase,
  ) {}

  @Get()
  async handle(@Param('ownerId', ObjectIdValidationPipe) ownerId: string) {
    const result = await this.findOrganizationByOwnerId.execute({
      ownerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value.organization
  }
}
