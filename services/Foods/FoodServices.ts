import { PrismaClient } from "@prisma/client";
import prisma from "../../config/DatabaseConnection";
import { FoodEntity } from "../../entities/FoodEntity";
import { IFoodService } from "./IFoodService";
import QueryParam from "../../interfaces/QueryDTO";

class FoodService implements IFoodService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  selectId(id: string): Promise<FoodEntity | null> {
    return this.prisma.foods.findFirst({
      where: {
        id,
      },
    });
  }

  async select(payload: any): Promise<FoodEntity[]> {
    const finalData = (await this.prisma.foods.count()) - 10;
    let random = 0;

    if (Object.keys(payload).length <= 0) {
      random = Math.floor(Math.random() * (finalData - 1 + 1)) + 1;
      return this.prisma.foods.findMany({
        take: 10,
        skip: random,
      });
    }
    const { name, dishtype } = payload;

    return this.prisma.foods.findMany({
      take: 10,
      skip: 0,
      where: {
        dishType: {
          contains: dishtype || undefined,
        },
        name: {
          contains: name || undefined,
        },
      },
    });
  }
}

export default FoodService;
