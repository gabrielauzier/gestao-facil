import { Type } from '@nestjs/common'
import { ModelDefinition, SchemaFactory } from '@nestjs/mongoose'
import { Schema } from 'mongoose'

export class MongoFactory {
  static createSchema<T>(forClass: Type<T>) {
    return SchemaFactory.createForClass(forClass)
  }

  static createDocument(model: ModelDefinition): ModelDefinition {
    return model
  }

  static forClass<T>(
    forClass: Type<T>,
    collection: string,
  ): [Schema<T>, ModelDefinition] {
    const schema = SchemaFactory.createForClass(forClass)

    const model: ModelDefinition = {
      name: collection,
      schema,
      collection,
    }

    return [schema, model]
  }
}
