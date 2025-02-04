import { expect, describe, it, beforeEach } from 'vitest'
import { ProductsUseCases } from '../use-cases'
import { InMemoryProductsRepository } from '../repository/in-memory-products-repository'
import { ProductNotFoundError } from '../errors/product-not-found-error'

let sut: ProductsUseCases
let productsRepository: InMemoryProductsRepository

describe('Products Use Case Tests', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new ProductsUseCases(productsRepository)
  })
  it('should create a product', async () => {
    const product = await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    expect(product.name).toBe('test')
  })

  it('should not create a product with a price less than or equal to 0', async () => {
    await expect(
      sut.createProduct({
        description: 'test',
        imageUrl: 'test',
        name: 'test',
        price: 0,
      }),
    ).rejects.toThrow()
  })

  it('should get all products', async () => {
    await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    const products = await sut.getProducts()

    expect(products).toHaveLength(1)
  })

  it('should get a product by id', async () => {
    await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    const product = await sut.getProductById(1)

    expect(product).not.toBeNull()
  })

  it('should throw an error if product does not exist', async () => {
    await sut.getProductById(2)

    expect(ProductNotFoundError).toThrow()
  })

  it('should update a product', async () => {
    await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    const updatedProduct = await sut.updateProduct(1, {
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    expect(updatedProduct.name).toBe('test')
  })

  it('should throw an error if product does not exist', async () => {
    await expect(
      sut.updateProduct(2, {
        description: 'test',
        imageUrl: 'test',
        name: 'test',
        price: 10,
      }),
    ).rejects.toThrow()
  })

  it('should delete a product', async () => {
    await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    await sut.deleteProduct(1)

    const products = await sut.getProducts()

    expect(products).toHaveLength(0)
  })

  it('should price must be greater than 0 and in cents', async () => {
    const product = await sut.createProduct({
      description: 'test',
      imageUrl: 'test',
      name: 'test',
      price: 10,
    })

    expect(product.price).toBe(1000)
  })
})
