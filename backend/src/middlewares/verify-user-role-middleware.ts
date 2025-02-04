import { Role } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const VerifyUserRoleMiddleware = (roleToVerify: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role as Role

    if (role !== roleToVerify) {
      res.status(403).json({ message: 'Unauthorized' })
    }

    next()
  }
}

export default VerifyUserRoleMiddleware
