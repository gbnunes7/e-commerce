export class QuantityMustBeGreatherThanZeroError extends Error {
  constructor() {
    super('Quantity must be greater than 0')
  }
}
