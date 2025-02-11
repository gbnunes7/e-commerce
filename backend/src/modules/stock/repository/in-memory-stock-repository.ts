import { Stock } from '@prisma/client'
import { IStockRepository } from '../interface'
import { createStockDTO, updateStockDTO } from '../DTO'

class InMemoryStockRepository implements IStockRepository {
  private Stock: Stock[] = []

  async createStock({ productId, quantity }: createStockDTO): Promise<Stock> {
    const newStock: Stock = {
      id: this.Stock.length + 1,
      product_id: productId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.Stock.push(newStock)

    return newStock
  }

  async getStocks(): Promise<Stock[]> {
    return this.Stock
  }

  async getStockByProductId(productId: number): Promise<Stock | null> {
    return this.Stock.find((stock) => stock.product_id === productId) || null
  }

  async updateStock({ quantity, stockId }: updateStockDTO): Promise<Stock> {
    const stockIndex = this.Stock.findIndex((stock) => stock.id === stockId)

    const updatedStock = {
      ...this.Stock[stockIndex],
      quantity,
      updatedAt: new Date(),
    }

    this.Stock[stockIndex] = updatedStock

    return updatedStock
  }

  async deleteStock(id: number): Promise<Stock> {
    const stockDeleted = this.Stock.filter((stock) => stock.id === id)[0]

    this.Stock = this.Stock.filter((stock) => stock.id !== id)

    return stockDeleted
  }
}

export { InMemoryStockRepository }
