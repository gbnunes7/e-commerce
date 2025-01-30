import { Role } from "@prisma/client";

export type createUserDto = {
    email: string;
    password: string;
    name: string | null;
    role: Role;
}

export type loginDto = {
    email: string;
    password: string;
}