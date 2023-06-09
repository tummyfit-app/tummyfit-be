import { PrismaClient } from "@prisma/client";

import { FoodEntity } from "../../entities/FoodEntity";
import { IFoodService } from "./IFoodService";
import moment from "moment";

class FoodService implements IFoodService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async insertMealPlan(data: any, id: string): Promise<any> {
    const total_data = data.length - 2;
    for (let i = 0; i < total_data; i++) {
      for (let j = 0; j < 5; j++) {
        // console.log(data[i].Day);
        // console.log(data[i].Menu[j]["Recipe Title"]);
        // console.log(data[i].Menu[j]["Category"]);
        // console.log(data[i].Menu[j]["Calories"]);
        // console.log(data[i].Menu[j]["Image"]);
        await this.prisma.userMealPlan.create({
          data: {
            day: data[i].Day,
            food_name: data[i].Menu[j]["Recipe Title"],
            image_url: data[i].Menu[j]["Image"],
            category: data[i].Menu[j]["Category"],
            calories: data[i].Menu[j]["Calories"],
            userId: id,
            date: moment(new Date()).format("YYYY-MM-DD"),
          },
        });
      }
    }
    return this.prisma.userMealPlan.findMany();
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
