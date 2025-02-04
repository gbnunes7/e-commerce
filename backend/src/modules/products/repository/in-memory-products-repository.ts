import { Products } from '@prisma/client'
import { IProductsRepository } from '../interface'
import { createProductDTO, updateProductDTO } from '../DTO'

class InMemoryProductsRepository implements IProductsRepository {
  private Products: Products[] = []

  async createProduct({
    description,
    imageUrl,
    name,
    price,
  }: createProductDTO): Promise<Products> {
    const newProduct: Products = {
      id: this.Products.length + 1,
      description,
      image_url: imageUrl,
      name,
      price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.Products.push(newProduct)

    return newProduct
  }

  async getProducts(): Promise<Products[]> {
    return this.Products
  }

  async getProductById(id: number): Promise<Products | null> {
    return this.Products.find((product) => product.id === id) || null
  }

  async updateProduct(
    id: number,
    { description, imageUrl, price, name }: updateProductDTO,
  ): Promise<Products> {
    const productIndex = this.Products.findIndex((product) => product.id === id)

    const updatedProduct = {
      ...this.Products[productIndex],
      description,
      image_url: imageUrl,
      price,
      name,
      updatedAt: new Date(),
    }

    this.Products[productIndex] = updatedProduct

    return updatedProduct
  }

  async deleteProduct(id: number): Promise<void> {
    const productIndex = this.Products.findIndex((product) => product.id === id)

    this.Products.splice(productIndex, 1)
  }
}

export { InMemoryProductsRepository }
