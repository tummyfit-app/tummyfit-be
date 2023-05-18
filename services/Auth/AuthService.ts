import { Prisma, PrismaClient } from "@prisma/client";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "./IAuthService";

import AuthDTO from "../../interfaces/AuthDTO";
import { hashPassword, comparePassword } from "../../utils/Bcrypt";

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
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
      },
    });
  }

  public async findOne(username: string): Promise<AuthEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        email: true,
        username: true,
        password: true,
        id: true,
      },
    });
  }
}

export default AuthService;
