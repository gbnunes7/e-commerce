/* eslint-disable camelcase */
import { PrismaClient, Products } from '@prisma/client'
import { IProductsRepository } from '../interface'
import { createProductDTO, updateProductDTO } from '../DTO'

class ProductsRepository implements IProductsRepository {
  private prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async getProducts(): Promise<Products[]> {
    return this.prismaClient.products.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        price: 'desc',
      },
      take: 10,
      skip: 0,
    })
  }

  async getProductById(id: number): Promise<Products | null> {
    return this.prismaClient.products.findFirst({
      where: {
        id,
      },
    })
  }

  async updateProduct(
    id: number,
    { description, imageUrl, price, name }: updateProductDTO,
  ): Promise<Products> {
    return this.prismaClient.products.update({
      where: {
        id,
      },
      data: {
        description,
        image_url: imageUrl,
        price,
        name,
      },
    })
  }

  async deleteProduct(id: number): Promise<void> {
    this.prismaClient.products.delete({
      where: {
        id,
      },
    })
  }

  async createProduct({
    description,
    imageUrl,
    name,
    price,
  }: createProductDTO): Promise<Products> {
    return this.prismaClient.products.create({
      data: {
        description,
        image_url: imageUrl,
        name,
        price,
      },
    })
  }
}

export { ProductsRepository }
