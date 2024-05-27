import { Module } from '@nestjs/common'

import { CreateOrganizationUseCase } from '../application/use-cases/create-organization'
import { FindOrganizationByOwnerIdUseCase } from '../application/use-cases/find-organization-by-owner-id'
import { UpdateOrganizationUseCase } from '../application/use-cases/update-organization'
import { CreateOrganizationController } from './http/controllers/create-organization.controller'
import { FindOrganizationByOwnerIdController } from './http/controllers/find-organization-by-owner-id.controller'
import { UpdateOrganizationController } from './http/controllers/update-organization.controller'
import { MongoOrganizationsModule } from './mongodb/mongo-organizations.module'

@Module({
  imports: [MongoOrganizationsModule],
  controllers: [
    CreateOrganizationController,
    FindOrganizationByOwnerIdController,
    UpdateOrganizationController,
  ],
  providers: [
    CreateOrganizationUseCase,
    FindOrganizationByOwnerIdUseCase,
    UpdateOrganizationUseCase,
  ],
})
export class OrganizationsModule {}
