import { PrismaClient } from '@prisma/client'
import { createStockDTO, updateStockDTO } from '../DTO'
import { IStockRepository } from '../interface'

class StockRepository implements IStockRepository {
  private prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async createStock({ productId, quantity }: createStockDTO) {
    return this.prismaClient.stock.create({
      data: {
        product_id: productId,
        quantity,
      },
    })
  }

  async updateStock({ stockId, quantity, operation }: updateStockDTO) {
    const updateData =
      operation === 'ADD' ? { increment: quantity } : { decrement: quantity }

    return this.prismaClient.stock.update({
      where: {
        id: stockId,
      },
      data: {
        quantity: updateData,
      },
    })
  }

  async deleteStock(id: number) {
    return this.prismaClient.stock.delete({
      where: {
        id,
      },
    })
  }

  async getStocks() {
    return this.prismaClient.stock.findMany()
  }

  async getStockByProductId(id: number) {
    return this.prismaClient.stock.findFirst({
      where: {
        id,
      },
    })
  }
}

export default StockRepository
