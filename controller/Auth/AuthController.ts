import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../interfaces/Controller";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "../../services/Auth/IAuthService";
import { IAuthController } from "./IAController";
import { authSchema, loginSchema } from "../../utils/SchemaValidation";
import { ValidationResult } from "joi";
import AuthDTO from "../../interfaces/AuthDTO";
import AppError from "../../utils/AppError";
import wrapAsync from "../../utils/CatchAsync";
import jwt from "jsonwebtoken";
import { comparePassword } from "../../utils/Bcrypt";
class AuthController implements Controller, IAuthController {
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

    const result: AuthEntity = await this.authService.insertOne(value);

    return response.json({
      status: "success",
      statusCode: "201 Created",
      data: result,
      message: "New user has been created",
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
      message: "username and password is valid.",
    });
  }
}

export default AuthController;
