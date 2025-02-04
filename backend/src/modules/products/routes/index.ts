import express from 'express'
import VerifyUserRoleMiddleware from '@/middlewares/verify-user-role-middleware'
import { productsController } from '../controller'

const router = express.Router()

const {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} = productsController

router
  .post('/products', VerifyUserRoleMiddleware('ADMIN'), createProduct)
  .delete('/products/:id', VerifyUserRoleMiddleware('ADMIN'), deleteProduct)
  .put('/products/:id', VerifyUserRoleMiddleware('ADMIN'), updateProduct)
  .get('/products', getProducts)
  .get('/products/:id', getProductById)

export default router
