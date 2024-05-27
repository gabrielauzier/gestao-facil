import { Prop, Schema } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

import { MongoFactory } from '@/core/infra/database/mongodb/mongo-factory'
import { MongoUser } from '@/gestao-facil/users/infra/mongodb/schemas/mongo-user.schema'

import { MongoOrganization } from './mongo-organization.schema'

@Schema()
export class MongoMember {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: MongoUser.name,
  })
  user_id: Types.ObjectId

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: MongoOrganization.name,
  })
  organization_id: Types.ObjectId

  @Prop({ required: true })
  role: string
}

export const [MongoMemberSchema, MongoMemberModel] = MongoFactory.forClass(
  MongoMember,
  'members',
)
