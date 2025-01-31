import { createUserDto, loginDto } from '../DTO'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import * as bcrypt from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { IAuthRepository } from '../interface'

class AuthUseCases {
  private authRepository: IAuthRepository

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async createUser({
    email,
    name,
    password,
    role,
  }: createUserDto): Promise<createUserDto> {
    const existingUser = await this.authRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.authRepository.createUser({
      email,
      name,
      password: passwordHash,
      role,
    })

    return user
  }

  async login({ email, password }: loginDto) {
    const user = await this.authRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}

export { AuthUseCases }
