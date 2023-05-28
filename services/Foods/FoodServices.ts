import { PrismaClient } from "@prisma/client";
import prisma from "../../config/DatabaseConnection";
import { FoodEntity } from "../../entities/FoodEntity";
import { IFoodService } from "./IFoodService";

class FoodService implements IFoodService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async select(): Promise<FoodEntity[]> {
    const finalData = (await this.prisma.foods.count()) - 10;
    const random = Math.floor(Math.random() * (finalData - 1 + 1)) + 1;
    return this.prisma.foods.findMany({
      take: 10,
      skip: random,
    });
  }
}

export default FoodService;
