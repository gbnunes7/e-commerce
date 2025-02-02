import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

const zodErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: JSON.stringify(error.errors) })
    return
  }

  res.status(500).json({ message: 'Erro interno do servidor' })
}

export default zodErrorHandler
