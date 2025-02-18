export type createOrderDTO = {
  userId: number
  totalPrice?: number
  status: string
  trackingCode: string
  address: string
  orderItems: {
    productId: number
    quantity: number
  }[]
}
