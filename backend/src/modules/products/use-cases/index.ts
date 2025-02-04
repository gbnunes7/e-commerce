import { Products } from '@prisma/client'
import { IProductsRepository } from '../interface'
import { createProductDTO, updateProductDTO } from '../DTO'
import { PriceMustBeGreaterThanZero } from '../errors/price-must-be-greater-than-0-error'
import { ProductNotFoundError } from '../errors/product-not-found-error'

class ProductsUseCases {
  private productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async createProduct({
    description,
    imageUrl,
    name,
    price,
  }: createProductDTO): Promise<Products> {
    if (price <= 0) {
      throw new PriceMustBeGreaterThanZero()
    }

    const priceInCents = price * 100

    return this.productsRepository.createProduct({
      description,
      imageUrl,
      name,
      price: priceInCents,
    })
  }

  async getProducts(): Promise<Products[]> {
    const products = this.productsRepository.getProducts()

    return products
  }

  async getProductById(id: number): Promise<Products | null> {
    const product = this.productsRepository.getProductById(id)

    if (!product) {
      throw new ProductNotFoundError()
    }

    return product
  }

  async updateProduct(
    id: number,
    // eslint-disable-next-line camelcase
    { imageUrl, name, price, description }: updateProductDTO,
  ): Promise<Products> {
    const productExists = await this.productsRepository.getProductById(id)

    if (!productExists) {
      throw new ProductNotFoundError()
    }

    if (price <= 0) {
      throw new PriceMustBeGreaterThanZero()
    }

    const priceInCents = price * 100

    const product = await this.productsRepository.updateProduct(id, {
      description,
      imageUrl,
      name,
      price: priceInCents,
    })

    return product
  }

  async deleteProduct(id: number): Promise<void> {
    const productExists = await this.productsRepository.getProductById(id)

    if (!productExists) {
      throw new ProductNotFoundError()
    }

    await this.productsRepository.deleteProduct(id)
  }
}

export { ProductsUseCases }
