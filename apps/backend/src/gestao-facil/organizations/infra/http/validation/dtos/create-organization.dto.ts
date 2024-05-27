import { z } from 'zod'

import { ZodValidationPipe } from '@/core/infra/pipes/zod-validation-pipe'

const createOrganizationSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
})

export type CreateOrganizationDTO = z.infer<typeof createOrganizationSchema>

export const CreateOrganizationPipe = new ZodValidationPipe(
  createOrganizationSchema,
)
