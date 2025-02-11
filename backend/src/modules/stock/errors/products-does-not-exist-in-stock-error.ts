export class ProductsDoesNotExistInStockError extends Error {
  constructor() {
    super('Product does not exist in stock')
  }
}
