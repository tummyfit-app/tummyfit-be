import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/Controller";
import { AuthEntity } from "../../entities/AuthEntity";
import { IAuth } from "../../services/Auth/IAuthService";
import { IAuthController } from "./IAController";
import authSchema from "../../utils/AuthLoginDTO";
import { ValidationResult } from "joi";
import AuthDTO from "../../interfaces/AuthDTO";

class AuthController implements Controller, IAuthController {
  router: Router = Router();
  path: string = "/auth";

  constructor(private authService: IAuth) {
    this.initialRouting();
  }

  async initialRouting() {
    this.router.get(`${this.path}/login`, this.findAll.bind(this));
    this.router.post(`${this.path}/register`, this.register.bind(this));
  }

  register(req: Request, response: Response): Response {
    const { value, error }: ValidationResult<AuthDTO> | undefined =
      authSchema.validate(req.body);

    return response.json({
      status: "success",
      data: value,
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
