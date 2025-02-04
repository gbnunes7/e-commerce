import { Categories, PrismaClient } from '@prisma/client'
import { ICategoriesRepository } from '../interface'
import { CreateCategoryDTO, updateCategoryDTO } from '../DTO'

class CategoriesRepository implements ICategoriesRepository {
  private prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async create({ name }: CreateCategoryDTO): Promise<Categories> {
    return this.prismaClient.categories.create({
      data: {
        name,
      },
    })
  }

  async update({ id, name }: updateCategoryDTO): Promise<Categories> {
    return this.prismaClient.categories.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  }

  async delete(id: number): Promise<Categories> {
    return this.prismaClient.categories.delete({
      where: {
        id,
      },
    })
  }

  async getAll(): Promise<Categories[]> {
    return this.prismaClient.categories.findMany()
  }

  async findCategoryByName(name: string): Promise<Categories | null> {
    return this.prismaClient.categories.findFirst({
      where: {
        name,
      },
    })
  }

  async findCategoryById(id: number): Promise<Categories | null> {
    return this.prismaClient.categories.findUnique({
      where: {
        id,
      },
    })
  }
}

export { CategoriesRepository }
