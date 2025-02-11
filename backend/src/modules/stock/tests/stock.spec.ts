import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryStockRepository } from '../repository/in-memory-stock-repository'
import { StockUseCases } from '../use-cases'

let sut: StockUseCases
let stockRepository: InMemoryStockRepository

describe('Products Use Case Tests', () => {
  beforeEach(() => {
    stockRepository = new InMemoryStockRepository()
    sut = new StockUseCases(stockRepository)
  })

  it('should create a stock', async () => {
    const stock = await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    expect(stock.quantity).toBe(10)
  })

  it('should get all stocks', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    const stocks = await sut.getStocks()

    expect(stocks).toHaveLength(1)
  })

  it('should get a stock by product id', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    const stock = await sut.getStockByProductId(1)

    expect(stock).not.toBeNull()
  })

  it('should update a stock', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    const stock = await sut.updateStock({
      quantity: 20,
      stockId: 1,
    })

    expect(stock.quantity).toBe(20)
  })

  it('should delete a stock', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    const stock = await sut.deleteStock(1)

    expect(stock).not.toBeNull()
  })

  it('should throw an error if stock does not exist', async () => {
    await expect(sut.deleteStock(2)).rejects.toThrow()
  })

  it('should throw an error if stock does not exist', async () => {
    await expect(
      sut.updateStock({ quantity: 20, stockId: 2 }),
    ).rejects.toThrow()
  })

  it('should not create a stock if quantity is less than or equal to 0', async () => {
    await expect(
      sut.createStock({
        productId: 1,
        quantity: 0,
      }),
    ).rejects.toThrow()
  })

  it('should not update a stock if quantity is less than or equal to 0', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    await expect(
      sut.updateStock({
        quantity: 0,
        stockId: 1,
      }),
    ).rejects.toThrow()
  })

  it('should not create a stock if product already exists', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    await expect(
      sut.createStock({
        productId: 1,
        quantity: 10,
      }),
    ).rejects.toThrow()
  })

  it('should not create a stock with stock for product id already exists', async () => {
    await sut.createStock({
      productId: 1,
      quantity: 10,
    })

    await expect(
      sut.createStock({
        productId: 1,
        quantity: 10,
      }),
    ).rejects.toThrow()
  })
})
