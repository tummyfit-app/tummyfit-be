import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/Controller";
import IUserService from "../../services/User/IUserService";
import authorizationMiddleware, {
  CustomRequest,
} from "../../middlewares/AuthorizationMiddleware";
import Joi from "joi";
import { descSchema } from "../../utils/SchemaValidation";
import { NextFunction } from "express";
import AppError from "../../utils/AppError";

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
      this.findUser.bind(this)
    );
    this.router.post(
      `${this.path}/`,
      authorizationMiddleware,
      this.create.bind(this)
    );
  }

  async create(req: Request, response: Response, next: NextFunction) {
    const { value, error } = descSchema.validate(req.body);
    const user = (req as CustomRequest).user;

    if (error) {
      return next(new AppError(error.message, "400"));
    }

    const result = await this.userService.insertUser(value, user.id);

    response.json({
      status: "success",
      statusCode: "201 Created",
      data: {
        UserDescription: result,
      },
      message: "User description has been successfully created",
    });
  }

  async findUser(req: Request, response: Response) {
    //Harus diubah ID nya berdasarkan inputan user
    const user = (req as CustomRequest).user;
    const result = await this.userService.findUser(user.id);
    response.json({
      status: "success",
      data: {
        UserDescription: result,
      },
    });
  }
}

export default UserController;
