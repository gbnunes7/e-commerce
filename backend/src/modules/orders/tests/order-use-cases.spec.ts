import { beforeEach, describe, expect, it } from 'vitest'
import { OrdersUseCases } from '../use-cases'
import { InMemoryOrdersRepository } from '../repository/in-memory-repository'

let sut: OrdersUseCases
let ordersRepository: InMemoryOrdersRepository

describe('Categories Use Cases', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new OrdersUseCases(ordersRepository)
  })

  it('should create a order', async () => {
    const order = await sut.createOrder({
      address: 'Rua teste',
      status: 'pending',
      orderItems: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
      totalPrice: 100,
      trackingCode: '123456',
      userId: 1,
    })

    expect(order.address).toBe('Rua teste')
  })
})
