import { Categories } from '@prisma/client'
import { ICategoriesRepository } from '../interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { updateCategoryDTO } from '../DTO'

class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Categories[] = []

  async create(category: Categories): Promise<Categories> {
    this.categories.push(category)
    return category
  }

  async findCategoryByName(name: string): Promise<Categories | null> {
    const category = this.categories.find((category) => category.name === name)

    if (!category) {
      return null
    }

    return category
  }

  async findCategoryById(id: number): Promise<Categories | null> {
    const category = this.categories.find(
      (category) => Number(category.id) === id,
    )

    if (!category) {
      return null
    }

    return category
  }

  async getAll(): Promise<Categories[]> {
    return this.categories
  }

  async delete(id: number): Promise<Categories> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    )

    const category = this.categories[categoryIndex]

    this.categories.splice(categoryIndex, 1)

    return category
  }

  update({ id, name }: updateCategoryDTO): Promise<Categories> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    )

    if (categoryIndex === -1) {
      throw new ResourceNotFoundError()
    }

    this.categories[categoryIndex].name = name

    return Promise.resolve(this.categories[categoryIndex])
  }
}

export { InMemoryCategoriesRepository }
