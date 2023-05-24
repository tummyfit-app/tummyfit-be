import { Prisma, PrismaClient } from "@prisma/client";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "./IAuthService";

import AuthDTO from "../../interfaces/AuthDTO";
import { hashPassword } from "../../utils/Bcrypt";

class AuthService implements IAuth {
  private prisma: PrismaClient;
  constructor(orm: PrismaClient) {
    this.prisma = orm;
  }
  async update(id: string, body: AuthDTO): Promise<AuthEntity> {
    if (body.password !== undefined) {
      body.password = hashPassword(body.password);
    }
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: body.username || undefined,
        email: body.email || undefined,
        password: body.password || undefined,
        namauser: body.namauser || undefined,
      },
    });
  }
  async insertOne(body: AuthDTO): Promise<AuthEntity | string> {
    body.password = hashPassword(body.password);
    return this.prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        namauser: body.namauser,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        namauser: true,
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
        namauser: true,
      },
    });
  }
}

export default AuthService;
