import { Prisma, PrismaClient } from "@prisma/client";
import UserEntity from "../../entities/UserEntity";

import IUserService from "./IUserService";

class UserService implements IUserService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findUser(id: string): Promise<UserEntity | null> {
    return this.prisma.userDescription.findFirst({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
  }
}

export default UserService;
