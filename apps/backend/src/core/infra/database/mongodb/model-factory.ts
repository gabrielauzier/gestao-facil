import { ModelDefinition } from '@nestjs/mongoose'

export class ModelFactory {
  static createForClass(model: ModelDefinition): ModelDefinition {
    return model
  }
}
