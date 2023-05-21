import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedEntity } from "../entities/DecodedEntity";

export interface CustomRequest extends Request {
  user: DecodedEntity;
}

function authorizationMiddleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  const header: string | undefined = req.headers.authorization;

  if (!header) {
    return next(new AppError("Invalid token provided", "403"));
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return next(new AppError("Environtment variable is not loaded", "500"));
  }

  try {
    const decoded = jwt.verify(header, secretKey) as DecodedEntity;

    (req as CustomRequest).user = decoded;

    next();
  } catch (error: any) {
    return next(new AppError("Invalid token provided", "403"));
  }
}

export default authorizationMiddleware;
