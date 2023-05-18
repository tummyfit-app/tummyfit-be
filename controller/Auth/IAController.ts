import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  findAll(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
  register(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
