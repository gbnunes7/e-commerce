import express from 'express'
import { orderController } from '../controller'

const router = express.Router()

const { createOrder, listOrders } = orderController

router.post('/orders', createOrder).get('/orders', listOrders)

export default router
