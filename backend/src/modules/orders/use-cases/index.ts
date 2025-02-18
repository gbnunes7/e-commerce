import { Orders } from '@prisma/client'
import { createOrderDTO } from '../DTO'
import { IOrdersRepository } from '../interface'
import { OrderMustHaveAtLeastOneItemError } from '../errors/order-must-have-at-least-one-item-error'
import { QuantityMustBeGreatherThanZeroError } from '../errors/quantity-must-be-greater-than-zeo-error'

class OrdersUseCases {
  private ordersRepository: IOrdersRepository

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async createOrder({
    address,
    status,
    trackingCode,
    userId,
    orderItems,
  }: createOrderDTO): Promise<Orders> {
    if (orderItems.length === 0) {
      throw new OrderMustHaveAtLeastOneItemError()
    }

    if (orderItems.some((item) => item.quantity <= 0)) {
      throw new QuantityMustBeGreatherThanZeroError()
    }

    const productIds = orderItems.map((item) => item.productId)
    const products = await this.ordersRepository.getProductsByIds(productIds)

    const totalPrice = products.reduce((acc, product) => {
      const item = orderItems.find((item) => item.productId === product.id)
      return acc + (product.price ?? 0) * (item?.quantity ?? 0)
    }, 0)

    const order = await this.ordersRepository.createOrder({
      address,
      status,
      totalPrice,
      trackingCode,
      userId,
      orderItems,
    })

    return order
  }

  async listOrders(): Promise<Orders[]> {
    return this.ordersRepository.listOrders()
  }
}

export { OrdersUseCases }
