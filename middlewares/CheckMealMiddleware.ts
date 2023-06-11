import { NextFunction, Request, Response } from "express";
import moment from "moment";
moment.locale("id");
import prisma from "../config/DatabaseConnection";
import { CustomRequest } from "./AuthorizationMiddleware";
import calculateDailyCalorieRequirement from "../utils/CalorieUser";

async function checkMeal(req: Request, response: Response, next: NextFunction) {
  const user = (req as CustomRequest).user;
  const { day }: any = req.query;
  const userResult = await prisma.userDescription.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          updatedAt: true,
        },
      },
    },
  });

  if (!userResult) {
    return next();
  }

  const result = await prisma.userMealPlan.findMany({
    where: {
      userId: user.id,
      day: day || undefined,
    },
  });
  if (result.length >= 1) {
    if (
      moment(new Date()).isoWeek() === moment(result[0].date).isoWeek() &&
      moment(userResult.user.updatedAt).isoWeek() ===
        moment(result[0].dateUpdatedUser).isoWeek()
    )
      return response.json({
        status: "success",
        statusCode: "200",
        data: {
          Meal: result,
        },
        message: "Success getting data",
      });
  }

  next();
}

export default checkMeal;
