import { Prop, Schema } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

import { MongoFactory } from '@/core/infra/database/mongodb/mongo-factory'
import { MongoUser } from '@/gestao-facil/users/infra/mongodb/schemas/mongo-user.schema'

@Schema()
export class MongoOrganization {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: MongoUser.name,
    unique: true,
  })
  owner_id: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  slug: string

  @Prop({ required: true })
  created_at: Date

  @Prop({ required: true })
  updated_at: Date
}

export const [MongoOrganizationSchema, MongoOrganizationModel] =
  MongoFactory.forClass(MongoOrganization, 'organizations')
