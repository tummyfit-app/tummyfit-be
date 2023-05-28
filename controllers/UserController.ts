import { Request, Response, Router } from "express";
import { Controller } from "../interfaces/Controller";
import IUserService from "../services/User/IUserService";
import authorizationMiddleware, {
  CustomRequest,
} from "../middlewares/AuthorizationMiddleware";

import { descSchema, updateDescUserSchema } from "../utils/SchemaValidation";
import { NextFunction } from "express";
import AppError from "../utils/AppError";
import UserEntity from "../entities/UserEntity";
import wrapAsync from "../utils/CatchAsync";

class UserController implements Controller {
  router: Router = Router();
  path: string = "/v1/users";

  constructor(private userService: IUserService) {
    this.initialRouting();
  }

  initialRouting() {
    this.router.get(
      `${this.path}/`,
      authorizationMiddleware,
      wrapAsync(this.findUser.bind(this))
    );
    this.router.post(
      `${this.path}/`,
      authorizationMiddleware,
      wrapAsync(this.create.bind(this))
    );
    this.router.patch(
      `${this.path}/:id`,
      authorizationMiddleware,
      wrapAsync(this.update.bind(this))
    );
  }
  async update(req: Request, response: Response, next: NextFunction) {
    const { value, error } = updateDescUserSchema.validate(req.body);
    const { id } = req.params;

    if (error) return next(new AppError(error.message, "400"));

    const result = await this.userService.update(value, id);
    response.json({
      status: "success",
      data: result,
      message: `${Object.keys(value)} telah diperbaharui`,
    });
  }

  async create(req: Request, response: Response, next: NextFunction) {
    const { value, error } = descSchema.validate(req.body);
    const user = (req as CustomRequest).user;

    if (error) {
      return next(new AppError(error.message, "400"));
    }

    const result: UserEntity | string = await this.userService.insertUser(
      value,
      user.id
    );

    response.json({
      status: "success",
      statusCode: "201 Created",
      data: {
        UserDescription: result,
      },
      message: "User description has been successfully created",
    });
  }

  async findUser(req: Request, response: Response, next: NextFunction) {
    //Harus diubah ID nya berdasarkan inputan user
    const user = (req as CustomRequest).user;
    const result = await this.userService.findUser(user.id);
    if (!result) {
      return next(new AppError("No Data found", "404"));
    }
    result.birthDate = result.birthDate.toISOString().split("T")[0];
    response.json({
      status: "success",
      data: {
        UserDescription: result,
      },
      message: "Getting Specific User Description",
    });
  }
}

export default UserController;
