import { z } from 'zod'
import { CategoriesUseCases } from '../use-cases'
import { Request, Response, NextFunction } from 'express'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { prismaInstance } from '@/models/client'
import { CategoriesRepository } from '../repository'

const categoriesRepository = new CategoriesRepository(prismaInstance)
const categoriesUseCases = new CategoriesUseCases(categoriesRepository)

class CategoriesController {
  private categoriesUseCases: CategoriesUseCases

  constructor(categoriesUseCases: CategoriesUseCases) {
    this.categoriesUseCases = categoriesUseCases
    this.createCategory = this.createCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.getAllCategories = this.getAllCategories.bind(this)
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const createCategoryBodySchema = z.object({
        name: z.string(),
      })

      const { name } = createCategoryBodySchema.parse(req.body)

      const category = await this.categoriesUseCases.createCategory({ name })

      res.status(201).send(category)
    } catch (error: unknown) {
      if (error instanceof CategoryAlreadyExistsError) {
        res.status(400).send({ message: error.message })
      }

      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteCategoryParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteCategoryParamsSchema.parse(req.params)
      await this.categoriesUseCases.deleteCategory(Number(id))

      res.status(204).send()
    } catch (error: unknown) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const updateCategoryBodySchema = z.object({
        name: z.string(),
      })
      const updateCategoryParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = updateCategoryParamsSchema.parse(req.params)
      const { name } = updateCategoryBodySchema.parse(req.body)

      const category = await this.categoriesUseCases.updateCategory({
        id: Number(id),
        name,
      })

      res.status(200).send(category)
    } catch (error: unknown) {
      if (error instanceof ResourceNotFoundError) {
        res.status(404).send({ message: error.message })
      }

      next(error)
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoriesUseCases.getAllCategories()

      res.status(200).send(categories)
    } catch (error: unknown) {
      next(error)
    }
  }
}

const categoriesController = new CategoriesController(categoriesUseCases)
export { categoriesController }
