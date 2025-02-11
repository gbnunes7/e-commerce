import express from 'express'
import { stockController } from '../controller'
import VerifyUserRoleMiddleware from '@/middlewares/verify-user-role-middleware'

const router = express.Router()

const {
  createStock,
  deleteStock,
  getStockByProductId,
  getStocks,
  updateStock,
} = stockController

router
  .post('/stocks/products', VerifyUserRoleMiddleware('ADMIN'), createStock)
  .delete(
    '/stocks/:id/products',
    VerifyUserRoleMiddleware('ADMIN'),
    deleteStock,
  )
  .put('/stocks/products', VerifyUserRoleMiddleware('ADMIN'), updateStock)
  .get('/stocks/:id/products', getStockByProductId)
  .get('/stocks/products', getStocks)

export default router
