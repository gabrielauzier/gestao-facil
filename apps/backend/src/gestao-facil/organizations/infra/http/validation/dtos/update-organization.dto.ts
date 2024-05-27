import { z } from 'zod'

import { ZodValidationPipe } from '@/core/infra/pipes/zod-validation-pipe'

const updateOrganizationSchema = z.object({
  name: z.string(),
  membersIds: z.array(z.string()),
})

export type UpdateOrganizationDTO = z.infer<typeof updateOrganizationSchema>

export const UpdateOrganizationPipe = new ZodValidationPipe(
  updateOrganizationSchema,
)
