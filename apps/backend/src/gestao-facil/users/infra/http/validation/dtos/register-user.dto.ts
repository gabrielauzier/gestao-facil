import { z } from 'zod'

import { ZodValidationPipe } from '@/core/infra/pipes/zod-validation-pipe'

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
})

export type RegisterUserDTO = z.infer<typeof registerUserSchema>

export const RegisterUserPipe = new ZodValidationPipe(registerUserSchema)
