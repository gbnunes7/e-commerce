import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryAuthRepository from '../repository/in-memory-auth-repository'
import { AuthUseCases } from '../use-cases'
import { compare } from 'bcrypt'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let authRepository: InMemoryAuthRepository
let sut: AuthUseCases

describe('Auth Use Cases', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository()
    sut = new AuthUseCases(authRepository)
  })

  it('should hash user password when register', async () => {
    const user = await sut.createUser({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      role: 'ADMIN',
    })

    const isPasswordHashed = await compare('any_password', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should throw error if user already exists', async () => {
    await sut.createUser({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      role: 'ADMIN',
    })

    await expect(
      sut.createUser({
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register a user', async () => {
    const user = await sut.createUser({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      role: 'ADMIN',
    })

    expect(user.email).toBe('any_email')
  })

  it('should authenticate a user', async () => {
    const user = await sut.createUser({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      role: 'ADMIN',
    })

    const authenticatedUser = await sut.login({
      email: 'any_email',
      password: 'any_password',
    })

    expect(authenticatedUser.email).toBe(user.email)
  })
})
