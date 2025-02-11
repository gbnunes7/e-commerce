import { createStockDTO, updateStockDTO } from '../DTO'
import { ProductsAlreadyExistsInStockError } from '../errors/products-already-exists-in-stock-error'
import { ProductsDoesNotExistInStockError } from '../errors/products-does-not-exist-in-stock-error'
import { QuantityMustBeGreatherThanZeroError } from '../errors/quantity-must-be-greater-than-zero-error'
import { IStockRepository } from '../interface'

class StockUseCases {
  private stockRepository: IStockRepository

  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository
  }

  async createStock({ productId, quantity }: createStockDTO) {
    const product = await this.stockRepository.getStockByProductId(productId)

    if (product && product.quantity > 0) {
      throw new ProductsAlreadyExistsInStockError()
    }

    if (quantity <= 0) {
      throw new QuantityMustBeGreatherThanZeroError()
    }

    return this.stockRepository.createStock({ productId, quantity })
  }

  async updateStock({ stockId, quantity, operation }: updateStockDTO) {
    if (quantity <= 0) {
      throw new QuantityMustBeGreatherThanZeroError()
    }

    const product = await this.stockRepository.getStockByProductId(stockId)

    if (!product) {
      throw new ProductsDoesNotExistInStockError()
    }

    return this.stockRepository.updateStock({ stockId, quantity, operation })
  }

  async deleteStock(id: number) {
    const product = await this.stockRepository.getStockByProductId(id)

    if (!product) {
      throw new ProductsDoesNotExistInStockError()
    }

    return this.stockRepository.deleteStock(id)
  }

  async getStocks() {
    return this.stockRepository.getStocks()
  }

  async getStockByProductId(id: number) {
    return this.stockRepository.getStockByProductId(id)
  }
}

export { StockUseCases }
