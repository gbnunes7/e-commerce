import { Categories } from '@prisma/client'
import { CreateCategoryDTO, updateCategoryDTO } from '../DTO'

export interface ICategoriesRepository {
  create({ name }: CreateCategoryDTO): Promise<Categories>
  getAll(): Promise<Categories[]>
  delete(id: number): Promise<Categories>
  update({ name }: updateCategoryDTO): Promise<Categories>
  findCategoryByName(name: string): Promise<Categories | null>
  findCategoryById(id: number): Promise<Categories | null>
}
