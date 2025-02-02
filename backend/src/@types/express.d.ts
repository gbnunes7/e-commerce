// express.d.ts
import { User } from '@prisma/client'
import 'express'

declare module 'express' {
  interface Request {
    cookies: Record<string, string>
    user?: Partial<User>
  }
}
