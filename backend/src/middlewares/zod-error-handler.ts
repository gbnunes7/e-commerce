import { Request, Response } from 'express'
import { ZodError } from 'zod'

const zodErrorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: err.errors })
    return
  }

  res.status(500).json({ message: 'Internal server error' })
}

export default zodErrorHandler
