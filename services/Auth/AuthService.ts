import { Prisma, PrismaClient } from "@prisma/client";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "./IAuthService";
import prisma from "../../config/DatabaseConnection";

class AuthService implements IAuth {
  private prisma: PrismaClient;
  constructor(orm: PrismaClient) {
    this.prisma = orm;
  }

  public async findAll(): Promise<AuthEntity[]> {
    return this.prisma.user.findMany();
  }
}

export default AuthService;
