import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'

import { CreateOrganizationUseCase } from '@/gestao-facil/organizations/application/use-cases/create-organization'

import {
  CreateOrganizationDTO,
  CreateOrganizationPipe,
} from '../validation/dtos/create-organization.dto'

@Controller('/organizations')
export class CreateOrganizationController {
  constructor(private createOrganization: CreateOrganizationUseCase) {}

  @Post()
  @UsePipes(CreateOrganizationPipe)
  async handle(@Body() body: CreateOrganizationDTO) {
    const { ownerId, name } = body

    const result = await this.createOrganization.execute({ ownerId, name })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value.organization
  }
}
