import { FoodEntity } from "../../entities/FoodEntity";

export interface IFoodService {
  select(query: any): Promise<FoodEntity[]>;
  selectId(id: string): Promise<FoodEntity | null>;
  insertMealPlan(data: any, id: string, day: string | undefined): Promise<any>;
}
