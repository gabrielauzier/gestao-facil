import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common'

import { ObjectIdValidationPipe } from '@/core/infra/pipes/object-id-validation-pipe'
import { UpdateOrganizationUseCase } from '@/gestao-facil/organizations/application/use-cases/update-organization'

import { UpdateOrganizationDTO } from '../validation/dtos/update-organization.dto'

@Controller('/organizations/:organizationId')
export class UpdateOrganizationController {
  constructor(private updateOrganization: UpdateOrganizationUseCase) {}

  @Put()
  async handle(
    @Param('organizationId', ObjectIdValidationPipe) organizationId: string,
    @Body() body: UpdateOrganizationDTO,
  ) {
    const { name } = body

    const result = await this.updateOrganization.execute({
      organizationId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    return result.value.organization
  }
}
