import { PrismaClient } from "@prisma/client";
import UserEntity from "../../entities/UserEntity";

import IUserService from "./IUserService";
import { calculate } from "../../utils/CalculateAge";
import { date } from "joi";

class UserService implements IUserService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async update(
    payload: UserEntity,
    dataId: string
  ): Promise<UserEntity | void> {
    let age: any = undefined;

    const result = await this.prisma.userDescription.findFirst({
      where: {
        id: dataId,
      },
    });

    if (result) {
      age = result.age;
    } else {
      if (payload.birthDate) age = calculate(payload.birthDate);
      else age = undefined;
    }

    const birthDateArray = payload.birthDate.split("-");

    const year = parseInt(birthDateArray[0]);
    const month = parseInt(birthDateArray[1]) - 1;
    const day = parseInt(birthDateArray[2]);
    const dateTime = new Date(year, month, day);

    return this.prisma.userDescription.update({
      where: {
        id: dataId,
      },
      data: {
        alcohol: payload.alcohol || undefined,
        userId: payload.userId || undefined,
        age: age || undefined,
        birthDate: dateTime || undefined,
        height: payload.height || undefined,
        weight: payload.weight || undefined,
        sex: payload.sex || undefined,
        gluten_free: payload.gluten_free || undefined,
        daily_activity: payload.daily_activity || undefined,
        dairy_free: payload.dairy_free || undefined,
        vegan: payload.vegan || undefined,
        vegetarian: payload.vegetarian || undefined,
        purpose: payload.purpose || undefined,
        user: payload.user || undefined,
      },
    });
  }

  async findUser(id: string): Promise<UserEntity | null> {
    return this.prisma.userDescription.findFirst({
      where: {
        userId: id,
      },

      select: {
        id: true,
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

    const ageUser = calculate(dateTime);

    return this.prisma.userDescription.create({
      data: {
        age: ageUser,
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
