import { PrismaClient, User } from "@prisma/client";
import { IAuthRepository } from "../interface";
import { createUserDto } from "../DTO";

export class AuthRepository implements IAuthRepository {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    createUser(user: createUserDto): Promise<createUserDto> {
        return this.prisma.user.create({
            data: user
        })
    }

    

}