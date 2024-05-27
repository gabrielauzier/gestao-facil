import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/application/either'

import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type RegisterUserParams = {
  name: string
  email: string
  phone?: string
}

type RegisterUserResult = Either<UserAlreadyExistsError, { user: User }>

@Injectable()
export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
  }: RegisterUserParams): Promise<RegisterUserResult> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const user = User.create({ name, email, phone })
    const { createdId } = await this.usersRepository.create(user)

    user.overwriteId(createdId)

    return right({ user })
  }
}
