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

  async insertUser(payload: UserEntity, userId: string): Promise<UserEntity> {
    return this.prisma.userDescription.create({
      data: {
        age: payload.age,
        height: payload.height,
        weight: payload.weight,
        sex: payload.sex,
        gluten_free: payload.gluten_free,
        dairy_free: payload.dairy_free,
        vegan: payload.vegan,
        vegetarian: payload.vegetarian,
        alcohol: payload.alcohol,
        daily_activity: payload.daily_activity,
        purpose: payload.purpose,
        userId: userId,
      },
    });
  }
}

export default UserService;
