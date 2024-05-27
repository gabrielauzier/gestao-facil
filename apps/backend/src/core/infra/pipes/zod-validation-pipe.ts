import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError, ValidationError } from 'zod-validation-error'

import { Either, left, right } from '@/core/application/either'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }

  safeTransform<T>(data: T): Either<ValidationError, T> {
    const validation = this.schema.safeParse(data)

    if (validation.success === false) {
      return left(fromZodError(validation.error))
    }

    return right(validation.data)
  }
}
