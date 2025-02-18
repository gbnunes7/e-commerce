import { prismaInstance } from '@/models/client'
import { OrdersRepository } from '../repository'
import { OrdersUseCases } from '../use-cases'
import { NextFunction, Response, Request } from 'express'
import { z } from 'zod'
import { QuantityMustBeGreatherThanZeroError } from '../errors/quantity-must-be-greater-than-zeo-error'
import { OrderMustHaveAtLeastOneItemError } from '../errors/order-must-have-at-least-one-item-error'

const ordersRepository = new OrdersRepository(prismaInstance)
const ordersUseCase = new OrdersUseCases(ordersRepository)

class OrderController {
  private ordersUseCase: OrdersUseCases

  constructor(ordersUseCase: OrdersUseCases) {
    this.ordersUseCase = ordersUseCase
    this.createOrder = this.createOrder.bind(this)
    this.listOrders = this.listOrders.bind(this)
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const createOrderBodySchema = z.object({
        address: z.string(),
        trackingCode: z.string(),
        userId: z.number(),
        orderItems: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number().positive(),
          }),
        ),
      })

      const { address, orderItems, trackingCode, userId } =
        createOrderBodySchema.parse(req.body)

      const order = await this.ordersUseCase.createOrder({
        address,
        status: 'pending',
        orderItems,
        trackingCode,
        userId,
      })

      res.status(201).send(order)
    } catch (error) {
      console.log(error)
      if (error instanceof QuantityMustBeGreatherThanZeroError) {
        res.status(400).send({ error: error.message })
        return
      }

      if (error instanceof OrderMustHaveAtLeastOneItemError) {
        res.status(400).send({ error: error.message })
        return
      }

      next(error)
    }
  }

  async listOrders(req: Request, res: Response) {
    const orders = await this.ordersUseCase.listOrders()
    res.status(200).json(orders)
  }
}

const orderController = new OrderController(ordersUseCase)

export { orderController }
