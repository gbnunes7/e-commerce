import { Orders } from '@prisma/client'
import { IOrdersRepository } from '../interface'
import { createOrderDTO } from '../DTO/index'

class InMemoryOrdersRepository implements IOrdersRepository {
  private orders: Orders[] = []

  async createOrder({
    address,
    status,
    totalPrice,
    trackingCode,
    userId,
  }: createOrderDTO): Promise<Orders> {
    const newOrder: Orders = {
      id: this.orders.length + 1,
      user_id: userId,
      total_price: totalPrice,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      tracking_code: trackingCode,
      address,
    }
    this.orders.push(newOrder)
    return newOrder
  }

  async listOrders(): Promise<Orders[]> {
    return this.orders
  }
}

export { InMemoryOrdersRepository }
