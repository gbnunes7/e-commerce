import { Stock } from '@prisma/client'
import { createStockDTO, updateStockDTO } from '../DTO'

export interface IStockRepository {
  createStock: ({ productId, quantity }: createStockDTO) => Promise<Stock>
  updateStock: ({
    stockId,
    quantity,
    operation,
  }: updateStockDTO) => Promise<Stock>
  deleteStock: (id: number) => Promise<Stock>
  getStocks: () => Promise<Stock[]>
  getStockByProductId: (id: number) => Promise<Stock | null>
}
