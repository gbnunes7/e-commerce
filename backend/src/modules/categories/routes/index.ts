import express from 'express'
import { categoriesController } from '../controller'
import VerifyUserRoleMiddleware from '@/middlewares/verify-user-role-middleware'

const router = express.Router()

const { createCategory, deleteCategory, getAllCategories, updateCategory } =
  categoriesController

router
  .post('/categories', VerifyUserRoleMiddleware('ADMIN'), createCategory)
  .delete('/categories/:id', VerifyUserRoleMiddleware('ADMIN'), deleteCategory)
  .put('/categories/:id', VerifyUserRoleMiddleware('ADMIN'), updateCategory)
  .get('/categories', getAllCategories)

export default router
