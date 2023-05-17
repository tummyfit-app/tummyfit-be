import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../interfaces/Controller";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "../../services/Auth/IAuthService";
import { IAuthController } from "./IAController";
import authSchema from "../../utils/AuthSchema";
import { ValidationResult } from "joi";
import AuthDTO from "../../interfaces/AuthDTO";
import AppError from "../../utils/AppError";
import wrapAsync from "../../utils/CatchAsync";

class AuthController implements Controller, IAuthController {
  router: Router = Router();
  path: string = "/auth";

  constructor(private authService: IAuth) {
    this.initialRouting();
  }

  async initialRouting() {
    this.router.get(`${this.path}/login`, this.findAll.bind(this));
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
      return next(new AppError(error.message, "400"));
    }

    const result = await this.authService.insertOne(value);

    return response.json({
      status: "success",
      statusCode: "201 Created",
      data: result,
    });
  }

  async findAll(req: Request, response: Response): Promise<Response> {
    try {
      const result: AuthEntity[] = await this.authService.findAll();

      return response.json({
        status: "Success",
        data: {
          user: result,
        },
      });
    } catch (err) {
      return response.json({
        status: "failed",
        message: err,
      });
    }
  }
}

export default AuthController;
