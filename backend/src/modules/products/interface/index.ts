import { Products } from '@prisma/client'
import { createProductDTO, updateProductDTO } from '../DTO'

interface IProductsRepository {
  createProduct({
    description,
    imageUrl,
    name,
    price,
  }: createProductDTO): Promise<Products>
  getProducts(): Promise<Products[]>
  getProductById(id: number): Promise<Products | null>
  updateProduct(
    id: number,
    { description, imageUrl, price, name }: updateProductDTO,
  ): Promise<Products>
  deleteProduct(id: number): Promise<void>
}

export { IProductsRepository }
