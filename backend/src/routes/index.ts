import type { Express } from 'express'
import express from 'express'
import cors from 'cors'
import authRoutes from '@/modules/auth/routes'
import zodErrorHandler from '@/middlewares/zod-error-handler'
import cookieParser from 'cookie-parser'

const setupRoutes = (app: Express) => {
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())

  app.get('/server-test', (req, res) => {
    res.send('Hello World, server is running')
  })

  app.use(authRoutes)

  app.use(zodErrorHandler)
}

export { setupRoutes }
