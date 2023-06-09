import { NextFunction, Request, Response } from "express";
import moment from "moment";
moment.locale("id");
import prisma from "../config/DatabaseConnection";
import { CustomRequest } from "./AuthorizationMiddleware";
import calculateDailyCalorieRequirement from "../utils/CalorieUser";

async function checkMeal(req: Request, response: Response, next: NextFunction) {
  const user = (req as CustomRequest).user;
  const userResult = await prisma.userDescription.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!userResult) {
    return next();
  }
  const result = await prisma.userMealPlan.findMany({
    where: {
      userId: user.id,
    },
  });
  if (result.length >= 1) {
    if (moment(new Date()).isoWeek() === moment(result[0].date).isoWeek())
      return response.json({
        status: "success",
        statusCode: "200",
        data: {
          Meal: result,
          Calorie: parseInt(
            calculateDailyCalorieRequirement(
              userResult.weight,
              userResult.height,
              userResult.sex,
              userResult.age,
              userResult.daily_activity.toLowerCase(),
              userResult.purpose
            ) + ""
          ),
        },
        message: "Success getting data",
      });
  }

  next();
}

export default checkMeal;
