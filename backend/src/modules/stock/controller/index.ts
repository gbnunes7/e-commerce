import { NextFunction, Request, Response } from 'express'
import { StockUseCases } from '../use-cases'
import { z } from 'zod'
import { ProductsAlreadyExistsInStockError } from '../errors/products-already-exists-in-stock-error'
import { QuantityMustBeGreatherThanZeroError } from '../errors/quantity-must-be-greater-than-zero-error'
import { ProductsDoesNotExistInStockError } from '../errors/products-does-not-exist-in-stock-error'
import StockRepository from '../repository'
import { prismaInstance } from '@/models/client'

const stockRepository = new StockRepository(prismaInstance)
const stockUseCases = new StockUseCases(stockRepository)

class StockController {
  private stockUseCases: StockUseCases

  constructor(stockUseCases: StockUseCases) {
    this.stockUseCases = stockUseCases
    this.createStock = this.createStock.bind(this)
    this.updateStock = this.updateStock.bind(this)
    this.deleteStock = this.deleteStock.bind(this)
    this.getStocks = this.getStocks.bind(this)
    this.getStockByProductId = this.getStockByProductId.bind(this)
  }

  async createStock(req: Request, res: Response, next: NextFunction) {
    const createStockBodySchema = z.object({
      productId: z.number(),
      quantity: z.number(),
    })
    try {
      const { productId, quantity } = createStockBodySchema.parse(req.body)

      const stock = await this.stockUseCases.createStock({
        productId,
        quantity,
      })

      res.status(201).json(stock)
    } catch (error: unknown) {
      if (error instanceof ProductsAlreadyExistsInStockError) {
        res.status(409).json({ message: error.message })
        return
      }

      if (error instanceof ProductsDoesNotExistInStockError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof QuantityMustBeGreatherThanZeroError) {
        res.status(400).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async updateStock(req: Request, res: Response, next: NextFunction) {
    const updateStockBodySchema = z.object({
      stockId: z.number(),
      quantity: z.number(),
      operation: z.enum(['ADD', 'SUBTRACT']),
    })

    try {
      const { stockId, quantity, operation } = updateStockBodySchema.parse(
        req.body,
      )

      const stock = await this.stockUseCases.updateStock({
        stockId,
        quantity,
        operation,
      })

      res.json(stock)
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof QuantityMustBeGreatherThanZeroError) {
        res.status(400).json({ message: error.message })
        return
      }

      if (error instanceof ProductsDoesNotExistInStockError) {
        res.status(404).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async deleteStock(req: Request, res: Response, next: NextFunction) {
    const deleteStockParamsSchema = z.object({
      id: z.string(),
    })

    try {
      const { id } = deleteStockParamsSchema.parse(req.params)

      await this.stockUseCases.deleteStock(Number(id))

      res.status(204).send()
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof ProductsDoesNotExistInStockError) {
        res.status(404).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async getStocks(req: Request, res: Response) {
    const stocks = await this.stockUseCases.getStocks()

    res.json(stocks)
  }

  async getStockByProductId(req: Request, res: Response, next: NextFunction) {
    const getStockByProductIdParamsSchema = z.object({
      id: z.string(),
    })

    try {
      const { id } = getStockByProductIdParamsSchema.parse(req.params)

      const stock = await this.stockUseCases.getStockByProductId(Number(id))

      res.json(stock)
    } catch (error: unknown) {
      next(error)
    }
  }
}

const stockController = new StockController(stockUseCases)
export { stockController }
