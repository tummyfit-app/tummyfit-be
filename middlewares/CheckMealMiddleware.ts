import { NextFunction, Request, Response } from "express";
import moment from "moment";
moment.locale("id");
import prisma from "../config/DatabaseConnection";
import { CustomRequest } from "./AuthorizationMiddleware";

const today = moment(new Date());

async function checkMeal(req: Request, response: Response, next: NextFunction) {
  const user = (req as CustomRequest).user;
  const result = await prisma.userMealPlan.findMany({
    where: {
      userId: user.id,
    },
  });
  if (result) {
    if (moment(new Date()).isoWeek() === moment(result[0].date).isoWeek())
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
