import express from 'express'
import { authController } from '../controller'

const router = express.Router()

const { createUser, login, refreshToken } = authController

router
  .post('/register', createUser)
  .post('/login', login)
  .patch('/refresh-token', refreshToken)

export default router
