import { z, ZodError } from 'zod'
import { AuthUseCases } from '../use-cases'
import { NextFunction, Request, Response } from 'express'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { prismaInstance } from '@/models/client'
import { AuthRepository } from '../repository'
import jwt from 'jsonwebtoken'
import { CONFIG } from '@/config/envConfig'

const authRepository = new AuthRepository(prismaInstance)
const authUseCases = new AuthUseCases(authRepository)

class AuthController {
  private authUseCases: AuthUseCases

  constructor(authUseCases: AuthUseCases) {
    this.authUseCases = authUseCases
    this.createUser = this.createUser.bind(this)
    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserBodySchema = z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
        role: z.enum(['ADMIN', 'USER']),
      })

      const { email, name, password, role } = createUserBodySchema.parse(
        req.body,
      )

      const user = await this.authUseCases.createUser({
        email,
        name,
        password,
        role,
      })

      res.status(201).json(user)
    } catch (error: unknown) {
      if (error instanceof UserAlreadyExistsError) {
        res.status(400).json({ message: error.message })
        return
      }

      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors })
        return
      }

      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const { email, password } = loginBodySchema.parse(req.body)

      const user = await this.authUseCases.login({ email, password })

      const token = jwt.sign(
        { id: user.id, role: user.role },
        CONFIG.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      )

      const refreshToken = jwt.sign({ id: user.id }, CONFIG.JWT_SECRET, {
        expiresIn: '7d',
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.status(200).json({ user, token })
    } catch (error: unknown) {
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found.' })
      }

      const decoded = jwt.verify(refreshToken, CONFIG.JWT_SECRET) as {
        id: string
      }

      const newAccessToken = jwt.sign({ id: decoded.id }, CONFIG.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.status(200).json({ accessToken: newAccessToken })
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Refresh token expired.' })
        return
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Refresh token invalid.' })
      }

      next(error)
    }
  }
}

const authController = new AuthController(authUseCases)
export { authController }
