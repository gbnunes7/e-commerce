import express from 'express'
import { authController } from '../controller'

const router = express.Router()

const { createUser, login } = authController

router.post('/register', createUser).post('/login', login)

export default router
