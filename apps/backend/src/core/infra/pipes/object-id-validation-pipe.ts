import { PipeTransform, UnprocessableEntityException } from '@nestjs/common'

import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'

export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string) {
    const isObjectId = new UniqueEntityID(value).isObjectId()

    if (!isObjectId) {
      throw new UnprocessableEntityException('ObjectID pipe failed')
    }

    return value
  }
}
