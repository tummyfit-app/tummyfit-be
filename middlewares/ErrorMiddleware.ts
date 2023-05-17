import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

function middlewareError(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(Number(error.statusCode)).json({
    status: "failed",
    statusCode: error.statusCode,
    message: error.message,
  });
}

export default middlewareError;
