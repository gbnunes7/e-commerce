import { User } from '@prisma/client'
import { IAuthRepository } from '@/modules/auth/interface'

class InMemoryAuthRepository implements IAuthRepository {
  public users: User[] = []

  async createUser(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }
}

export default InMemoryAuthRepository
