import { Prisma, PrismaClient } from "@prisma/client";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "./IAuthService";
import prisma from "../../config/DatabaseConnection";
import AuthDTO from "../../interfaces/AuthDTO";
import hashPassword from "../../utils/Bcrypt";

class AuthService implements IAuth {
  private prisma: PrismaClient;
  constructor(orm: PrismaClient) {
    this.prisma = orm;
  }
  async insertOne(body: AuthDTO): Promise<AuthEntity> {
    body.password = hashPassword(body.password);
    return this.prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
  }

  public async findAll(): Promise<AuthEntity[]> {
    return this.prisma.user.findMany();
  }
}

export default AuthService;
