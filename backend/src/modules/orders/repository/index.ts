import { Orders, PrismaClient, Products } from '@prisma/client'
import { IOrdersRepository } from '../interface'
import { createOrderDTO } from '../DTO'

class OrdersRepository implements IOrdersRepository {
  private prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async createOrder({
    address,
    orderItems,
    status,
    totalPrice,
    trackingCode,
    userId,
  }: createOrderDTO): Promise<Orders> {
    return this.prismaClient.orders.create({
      data: {
        address,
        status,
        total_price: totalPrice ?? 0,
        tracking_code: trackingCode,
        user_id: userId,
        OrderItems: {
          create: orderItems.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        OrderItems: true,
      },
    })
  }

  async listOrders(): Promise<Orders[]> {
    return this.prismaClient.orders.findMany({
      include: {
        OrderItems: true,
      },
    })
  }

  async getProductsByIds(productIds: number[]): Promise<Products[]> {
    return this.prismaClient.products.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    })
  }
}

export { OrdersRepository }
