import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/Controller";
import { AuthEntity } from "../entities/AuthEntity";
import { IAuth } from "../services/Auth/IAuthService";
import {
  authSchema,
  loginSchema,
  updateUserSchema,
} from "../utils/SchemaValidation";
import { ValidationResult } from "joi";
import AuthDTO from "../interfaces/AuthDTO";
import AppError from "../utils/AppError";
import wrapAsync from "../utils/CatchAsync";
import jwt from "jsonwebtoken";
import { comparePassword } from "../utils/Bcrypt";
import authorizationMiddleware, {
  CustomRequest,
} from "../middlewares/AuthorizationMiddleware";
import { DecodedEntity } from "../entities/DecodedEntity";
import dotenv from "dotenv";
dotenv.config();
class AuthController implements Controller {
  router: Router = Router();
  path: string = "/auth";

  constructor(private authService: IAuth) {
    this.initialRouting();
  }

  async initialRouting() {
    this.router.post(`${this.path}/login`, wrapAsync(this.findAll.bind(this)));
    this.router.post(
      `${this.path}/register`,
      wrapAsync(this.register.bind(this))
    );
    this.router.patch(
      `${this.path}/`,
      authorizationMiddleware,
      wrapAsync(this.update.bind(this))
    );
    this.router.get(`${this.path}/`, wrapAsync(this.find.bind(this)));
  }

  async find(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const username = (req as CustomRequest).user.username;
    const result = await this.authService.findOne(username);

    return response.json({
      status: "success",
      data: {
        User: result,
      },
    });
  }

  async update(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const { value, error } = updateUserSchema.validate(req.body);
    const user: DecodedEntity = (req as CustomRequest).user;
    if (Object.keys(value).length === 0) {
      return response.status(204).json({});
    }
    if (error) {
      return next(new AppError(error.message, "400"));
    }

    await this.authService.update(user.id, value);

    return response.json({
      status: "success",
      statusCode: "200",
      response: {
        message: `Data telah diperbaharui`,
      },
    });
  }

  async register(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { value, error }: ValidationResult<AuthDTO> = authSchema.validate(
      req.body
    );

    if (error != undefined) {
      return next(
        new AppError(error.message.replace(/(?:\\(.))/g, "$1"), "400")
      );
    }

    const result: AuthEntity | string = await this.authService.insertOne(value);

    return response.json({
      status: "success",
      statusCode: "201 Created",
      data: result,
      message: "New user has been successfully registered.",
    });
  }

  async findAll(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { value, error } = loginSchema.validate(req.body);

    if (error) {
      return next(new AppError("invalid payload request", "400"));
    }

    const result = await this.authService.findOne(value.username);

    if (!result)
      //result cannot be found
      return next(new AppError("invalid username or password", "400"));

    //comparing plain-text password with hashedPassword
    if (!comparePassword(value.password, result.password)) {
      return next(new AppError("invalid username or password", "400"));
    }

    if (!process.env.JWT_SECRET_KEY) {
      return next(new AppError("Environtment variable Invalid", "500"));
    }

    const token: string = jwt.sign(
      {
        id: result.id,
        username: result.username,
      },
      process.env.JWT_SECRET_KEY
    );

    return response.json({
      status: "success",
      statusCode: "200 OK",
      token,
      message: "Login success",
    });
  }
}

export default AuthController;
