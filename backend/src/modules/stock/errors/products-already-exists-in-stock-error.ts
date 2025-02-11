export class ProductsAlreadyExistsInStockError extends Error {
  constructor() {
    super('Product already exists in stock')
  }
}
