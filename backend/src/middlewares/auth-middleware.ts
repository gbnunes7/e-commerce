import { CONFIG } from '@/config/envConfig'
import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, CONFIG.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user as User
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
