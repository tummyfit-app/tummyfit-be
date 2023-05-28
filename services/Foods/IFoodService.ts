import { FoodEntity } from "../../entities/FoodEntity";

export interface IFoodService {
  select(name: string | undefined): Promise<FoodEntity[]>;
}
