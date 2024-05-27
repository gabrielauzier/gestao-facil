import { Prop, Schema } from '@nestjs/mongoose'

import { MongoFactory } from '@/core/infra/database/mongodb/mongo-factory'

@Schema()
export class MongoUser {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: false })
  phone?: string

  @Prop({ required: true })
  created_at: Date

  @Prop({ required: true })
  updated_at: Date
}

export const [MongoUserSchema, MongoUserModel] = MongoFactory.forClass(
  MongoUser,
  'users',
)
