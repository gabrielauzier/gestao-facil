import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { MembersRepository } from '../../application/repositories/members-repository'
import { OrganizationsRepository } from '../../application/repositories/organizations-repository'
import { MongoMembersRepository } from './repositories/mongo-members-repository'
import { MongoOrganizationsRepository } from './repositories/mongo-organizations-repository'
import { MongoMemberModel } from './schemas/mongo-member.schema'
import { MongoOrganizationModel } from './schemas/mongo-organization.schema'

@Module({
  imports: [
    MongooseModule.forFeature([MongoOrganizationModel, MongoMemberModel]),
  ],
  providers: [
    {
      provide: OrganizationsRepository,
      useClass: MongoOrganizationsRepository,
    },
    {
      provide: MembersRepository,
      useClass: MongoMembersRepository,
    },
  ],
  exports: [OrganizationsRepository, MembersRepository],
})
export class MongoOrganizationsModule {}
