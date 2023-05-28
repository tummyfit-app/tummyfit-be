import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/Controller";
import prisma from "../config/DatabaseConnection";
import { IFoodService } from "../services/Foods/IFoodService";
import wrapAsync from "../utils/CatchAsync";

class FoodController implements Controller {
  router: Router = Router();
  path: string = "/v1/foods";
  constructor(private foodService: IFoodService) {
    this.initialRouting();
  }

  initialRouting() {
    this.router.get(`${this.path}`, wrapAsync(this.select.bind(this)));
  }

  async select(req: Request, response: Response, next: NextFunction) {
    const result = await this.foodService.select();
    response.json({
      status: "success",
      statusCode: "200",
      data: {
        Foods: result,
      },
      message: "Success getting foods data",
    });
  }
}

export default FoodController;