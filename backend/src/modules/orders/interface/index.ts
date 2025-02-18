import { Orders, Products } from '@prisma/client'
import { createOrderDTO } from '../DTO'

export interface IOrdersRepository {
  createOrder({
    address,
    status,
    totalPrice,
    trackingCode,
    userId,
  }: createOrderDTO): Promise<Orders>
  listOrders(): Promise<Orders[]>
  getProductsByIds(productIds: number[]): Promise<Products[]>
}
