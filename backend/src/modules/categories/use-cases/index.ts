import { Categories } from '@prisma/client'
import { CreateCategoryDTO, updateCategoryDTO } from '../DTO'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ICategoriesRepository } from '../interface'

class CategoriesUseCases {
  private categoriesRepository: ICategoriesRepository

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async createCategory({
    name,
  }: CreateCategoryDTO): Promise<CreateCategoryDTO> {
    const isCategoryExists =
      await this.categoriesRepository.findCategoryByName(name)

    if (isCategoryExists !== null) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.create({ name })

    return category
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoriesRepository.delete(id)
  }

  async updateCategory({ id, name }: updateCategoryDTO): Promise<Categories> {
    const existingCategory = await this.categoriesRepository.findCategoryById(
      Number(id),
    )

    if (!existingCategory) {
      throw new ResourceNotFoundError()
    }

    const category = await this.categoriesRepository.update({
      id,
      name,
    })

    return category
  }

  async getAllCategories(): Promise<Categories[]> {
    const categories = this.categoriesRepository.getAll()

    return categories
  }
}

export { CategoriesUseCases }
