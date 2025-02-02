import { CONFIG } from '@/config/envConfig'
import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')

  if (!token) {
    res
      .status(401)
      .json({ message: 'Acesso negado, token de verificação não fornecido' })
    return
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET)

    req.user = decoded as User

    next()
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' })
  }
}

export default authMiddleware
