import { PrismaClient } from "@prisma/client";
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

      select: {
        birthDate: true,
        height: true,
        weight: true,
        sex: true,
        gluten_free: true,
        daily_activity: true,
        dairy_free: true,
        vegan: true,
        vegetarian: true,
        alcohol: true,
        purpose: true,
        userId: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async insertUser(
    payload: UserEntity,
    userId: string
  ): Promise<UserEntity | string> {
    const dateString: string = "" + payload.birthDate;

    const dateSplit = dateString.split("-");
    const year = parseInt(dateSplit[0]);
    const month = parseInt(dateSplit[1]) - 1;
    const day = parseInt(dateSplit[2]);
    const dateTime = new Date(year, month, day);
    dateTime.setUTCHours(dateTime.getUTCHours() + 7);

    return this.prisma.userDescription.create({
      data: {
        birthDate: dateTime,
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
      select: {
        birthDate: true,
        height: true,
        weight: true,
        sex: true,
        gluten_free: true,
        daily_activity: true,
        dairy_free: true,
        vegan: true,
        vegetarian: true,
        alcohol: true,
        purpose: true,
        userId: true,
        user: {
          select: {
            username: true,
            email: true,
            namauser: true,
          },
        },
      },
    });
  }
}

export default UserService;
