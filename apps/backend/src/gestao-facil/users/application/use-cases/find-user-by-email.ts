import { Either, left, right } from '@/core/application/either'
import { ResourceNotFoundError } from '@/core/domain/errors/errors/resource-not-found-error'

import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

type FindUserByEmailParams = {
  email: string
}

type FindUserByEmailResult = Either<ResourceNotFoundError, { user: User }>

export class FindUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: FindUserByEmailParams): Promise<FindUserByEmailResult> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
