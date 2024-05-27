import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  APP_ORIGINS: z.string().transform((origins) => origins.split(',')),
})

export type Env = z.infer<typeof envSchema>
