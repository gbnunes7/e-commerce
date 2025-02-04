/* eslint-disable no-useless-return */
import { ProductsUseCases } from '../use-cases'
import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { PriceMustBeGreaterThanZero } from '../errors/price-must-be-greater-than-0-error'
import { ProductNotFoundError } from '../errors/product-not-found-error'
import { ProductsRepository } from '../repository'
import { prismaInstance } from '@/models/client'

const productsRepository = new ProductsRepository(prismaInstance)
const productsUseCases = new ProductsUseCases(productsRepository)

class ProductsController {
  private productsUseCases: ProductsUseCases

  constructor(productsUseCases: ProductsUseCases) {
    this.productsUseCases = productsUseCases
    this.createProduct = this.createProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.getProductById = this.getProductById.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    const productBodySchema = z.object({
      description: z.string(),
      imageUrl: z.string(),
      name: z.string(),
      price: z.number(),
    })

    try {
      const { description, imageUrl, name, price } = productBodySchema.parse(
        req.body,
      )
      const product = await this.productsUseCases.createProduct({
        description,
        imageUrl,
        name,
        price,
      })

      res.status(201).json(product)
    } catch (error: unknown) {
      if (error instanceof PriceMustBeGreaterThanZero) {
        res.status(400).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productsUseCases.getProducts()

      res.status(200).json(products)
    } catch (error: unknown) {
      next(error)
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    const getProductByIdParamsSchema = z.object({
      id: z.string(),
    })
    try {
      const { id } = getProductByIdParamsSchema.parse(req.params)
      const product = await this.productsUseCases.getProductById(Number(id))

      res.status(200).json(product)
    } catch (error: unknown) {
      if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const updateProductBodySchema = z.object({
      description: z.string(),
      imageUrl: z.string(),
      name: z.string(),
      price: z.number(),
    })

    const updateProductParamsSchema = z.object({
      id: z.string(),
    })

    try {
      const { id } = updateProductParamsSchema.parse(req.params)
      const { description, imageUrl, name, price } =
        updateProductBodySchema.parse(req.body)
      const updatedProduct = await this.productsUseCases.updateProduct(
        Number(id),
        {
          description,
          imageUrl,
          name,
          price,
        },
      )

      res.status(200).json(updatedProduct)
    } catch (error: unknown) {
      if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof PriceMustBeGreaterThanZero) {
        res.status(400).json({ message: error.message })
        return
      }

      next(error)
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const deleteProductParamsSchema = z.object({
      id: z.string(),
    })
    try {
      const { id } = deleteProductParamsSchema.parse(req.params)
      await this.productsUseCases.deleteProduct(Number(id))

      res.status(204).send()
    } catch (error: unknown) {
      if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }
      next(error)
    }
  }
}

const productsController = new ProductsController(productsUseCases)
export { productsController }
