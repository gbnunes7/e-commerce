export type createStockDTO = {
  productId: number
  quantity: number
}

export type updateStockDTO = {
  stockId: number
  quantity: number
  operation: 'ADD' | 'SUBTRACT'
}
