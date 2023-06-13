import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/Controller";
import { IFoodService } from "../services/Foods/IFoodService";
import wrapAsync from "../utils/CatchAsync";
import authorizationMiddleware, {
  CustomRequest,
} from "../middlewares/AuthorizationMiddleware";
import AppError from "../utils/AppError";
import { FoodEntity } from "../entities/FoodEntity";
import axios from "axios";
import IUserService from "../services/User/IUserService";
import validPayload from "../utils/PredictPayload";
import checkMeal from "../middlewares/CheckMealMiddleware";

import prisma from "../config/DatabaseConnection";

class FoodController implements Controller {
  router: Router = Router();
  path: string = "/v1/foods";
  constructor(
    private foodService: IFoodService,
    private userService: IUserService
  ) {
    this.initialRouting();
  }

  initialRouting() {
    this.router.get(
      `${this.path}/`,
      authorizationMiddleware,
      wrapAsync(this.select.bind(this))
    );
    this.router.get(
      `${this.path}/predict`,
      authorizationMiddleware,
      wrapAsync(checkMeal),
      wrapAsync(this.predict.bind(this))
    );
    this.router.get(
      `${this.path}/:id`,
      authorizationMiddleware,
      wrapAsync(this.selectId.bind(this))
    );
  }

  async selectId(req: Request, response: Response, next: NextFunction) {
    const result: FoodEntity | null = await this.foodService.selectId(
      req.params.id
    );

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
    const result = await this.foodService.select(req.query);
    response.json({
      status: "success",
      statusCode: 200,
      data: {
        Foods: result,
      },
      message: "Success getting foods data",
    });
  }

  async predict(req: Request, response: Response, next: NextFunction) {
    const user = (req as CustomRequest).user;
    await prisma.userMealPlan.deleteMany();
    const result = await this.userService.findUser(user.id);
    if (!result) {
      return next(new AppError("Data not found", "404"));
    }
    const dataPayload = validPayload(result);
    const predictionData = await axios.post(
      "https://tummyfit-prediction-production.up.railway.app/",
      dataPayload
    );
    const { data } = predictionData;
    const { day }: any = req.query;
    data.userUpdated = result.user.updatedAt;
    const resultData = await this.foodService.insertMealPlan(
      data,
      user.id,
      day
    );

    return response.json({
      status: "success",
      data: {
        Meal: resultData,
      },
      message: "Success do prediction",
    });
  }
}

export default FoodController;
