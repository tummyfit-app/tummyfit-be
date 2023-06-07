import { Prisma } from "@prisma/client";

export interface FoodEntity {
  name: string;
  calories: Prisma.Decimal;
  fat: Prisma.Decimal;
  protein: Prisma.Decimal;
  carbo: Prisma.Decimal;
  alcohol: Prisma.Decimal;
  image: string;
  ingredients: string[];
  dishType: string;
  halal: string;
  popular: string;
  ready_minutes: number;
  price: number;
  vegetarian: string;
  instructions: string;
}
