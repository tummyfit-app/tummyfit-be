import { FoodEntity } from "../../entities/FoodEntity";

export interface IFoodService {
  select(): Promise<FoodEntity[]>;
}
