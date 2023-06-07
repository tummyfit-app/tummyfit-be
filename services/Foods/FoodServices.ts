import { PrismaClient } from "@prisma/client";

import { FoodEntity } from "../../entities/FoodEntity";
import { IFoodService } from "./IFoodService";

class FoodService implements IFoodService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  selectId(idName: string): Promise<FoodEntity | null> {
    return this.prisma.foods.findFirst({
      where: {
        OR: [
          {
            id: idName || undefined,
          },
          {
            name: idName || undefined,
          },
        ],
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
    const { name, dishtype, halal, popular, minutes, price } = payload;

    return this.prisma.foods.findMany({
      take: 10,
      skip: 0,
      where: {
        price: {
          lte: parseInt(price) || undefined,
        },
        ready_minutes: {
          lte: parseInt(minutes) || undefined,
        },

        popular: {
          contains: popular || undefined,
        },
        halal: {
          contains: halal || undefined,
        },
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
