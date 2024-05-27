import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'

import { RegisterUserUseCase } from '@/gestao-facil/users/application/use-cases/register-user'

import {
  RegisterUserDTO,
  RegisterUserPipe,
} from '../validation/dtos/register-user.dto'

@Controller('/users')
export class RegisterUserController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @UsePipes(RegisterUserPipe)
  async handle(@Body() body: RegisterUserDTO) {
    const { name, email, phone } = body

    const result = await this.registerUser.execute({ name, email, phone })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    return result.value.user
  }
}
