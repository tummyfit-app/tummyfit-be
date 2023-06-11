import { NextFunction, Request, Response, response } from "express";
import AppError from "../utils/AppError";

const PrismaErrorUniqueValidation = (error: AppError, response: Response) => {
  const message: string = `${error.meta.target} sudah terpakai, silahkan coba yang lain`;
  response.status(400).json({
    status: "failed",
    statusCode: "400",
    message: message,
  });
};

const PrismaUpdateNotFoundError = (error: AppError, response: Response) => {
  const message = error.meta["cause"];

  response.status(404).json({
    status: "failed",
    statusCode: "404",
    message: `${message}`,
  });
};

export interface CustomError {
  code: string;
  statusCode?: string;
  message?: string;
}

function middlewareError(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const codeStatus = error.statusCode || "500";

  if (error.code === "P2002") {
    PrismaErrorUniqueValidation(error, res);
  } else if (error.code === "P2025") {
    PrismaUpdateNotFoundError(error, res);
  } else {
    res.status(Number(codeStatus)).json({
      status: "failed",
      statusCode: codeStatus,
      message: error.message,
    });
  }
}

export default middlewareError;
