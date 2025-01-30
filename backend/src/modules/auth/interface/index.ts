import { User } from "@prisma/client";
import { createUserDto } from "../DTO";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;

  createUser(user: createUserDto): Promise<createUserDto>;
}
