import { Request, Response } from "express";
import { Database } from "../config/DatabaseConnection";
import { IUser } from "../entities/UserEntity";

export class UserController {
  async insertUser(request: Request, response: Response) {
    const result: IUser[] = await Database.GetConnection().user.findMany();

    response.json({
      status: "success",
      statusCode: "200 OK",
      data: {
        user: result,
      },
    });
  }
}
