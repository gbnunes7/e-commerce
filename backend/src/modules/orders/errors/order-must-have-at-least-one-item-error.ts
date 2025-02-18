export class OrderMustHaveAtLeastOneItemError extends Error {
  constructor() {
    super('Order must have at least one item')
  }
}
