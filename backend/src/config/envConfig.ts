import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Expected number, received NaN',
    }),
  JWT_SECRET: z.string(),
  POSTGRESQL_USERNAME: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
  POSTGRESQL_DATABASE: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Environment validation error:', _env.error.format())

  throw new Error('Environment validation error')
}

const env = _env.data

export const CONFIG = {
  PORT: env.PORT,
  JWT_SECRET: env.JWT_SECRET,
  POSTGRESQL_USERNAME: env.POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD: env.POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE: env.POSTGRESQL_DATABASE,
}
