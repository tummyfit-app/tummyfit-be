import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedEntity } from "../entities/DecodedEntity";
import prisma from "../config/DatabaseConnection";

export interface CustomRequest extends Request {
  user: DecodedEntity;
}

async function authorizationMiddleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return next(new AppError("Invalid token provided", "401"));
  }

  const splitToken = req.headers.authorization.split(" ");

  if (splitToken[0] != "Bearer") {
    return next(new AppError("Invalid Bearer", "401"));
  }
  const header: string = splitToken[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return next(new AppError("Environtment variable is not loaded", "500"));
  }

  try {
    const decoded = jwt.verify(header, secretKey) as DecodedEntity;

    (req as CustomRequest).user = decoded;

    const result = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!result) {
      return next(new AppError("Data is not valid", "404"));
    }

    next();
  } catch (error: any) {
    return next(new AppError("Invalid token provided", "401"));
  }
}

export default authorizationMiddleware;
