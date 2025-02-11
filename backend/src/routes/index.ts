import type { Express } from 'express'
import express from 'express'
import cors from 'cors'
import authRoutes from '@/modules/auth/routes'
import zodErrorHandler from '@/middlewares/zod-error-handler'
import cookieParser from 'cookie-parser'
import { authMiddleware } from '@/middlewares/auth-middleware'
import categoriesRoutes from '@/modules/categories/routes'
import productsRoutes from '@/modules/products/routes'
import stocksRoutes from '@/modules/stock/routes'

const setupRoutes = (app: Express) => {
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())

  app.get('/server-test', (req, res) => {
    res.send('Hello World, server is running')
  })
  app.use(authRoutes)
  app.use(authMiddleware)
  app.use(categoriesRoutes)
  app.use(productsRoutes)
  app.use(stocksRoutes)

  app.use(zodErrorHandler)
}

export { setupRoutes }
