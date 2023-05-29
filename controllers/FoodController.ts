import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/Controller";
import { IFoodService } from "../services/Foods/IFoodService";
import wrapAsync from "../utils/CatchAsync";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import AppError from "../utils/AppError";

class FoodController implements Controller {
  router: Router = Router();
  path: string = "/v1/foods";
  constructor(private foodService: IFoodService) {
    this.initialRouting();
  }

  initialRouting() {
    this.router.get(
      `${this.path}`,
      authorizationMiddleware,
      wrapAsync(this.select.bind(this))
    );
    this.router.get(
      `${this.path}/:id`,
      authorizationMiddleware,
      wrapAsync(this.selectId.bind(this))
    );
  }

  async selectId(req: Request, response: Response, next: NextFunction) {
    const result = await this.foodService.selectId(req.params.id);

    if (!result) {
      return next(new AppError("No Data Found", "404"));
    }
    response.json({
      status: "success",
      data: {
        Food: result,
      },
      message: "Successfully fetching data",
    });
  }

  async select(req: Request, response: Response, next: NextFunction) {
    const { name } = req.query;
    const result = await this.foodService.select(name + "");
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
