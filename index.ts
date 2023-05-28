import dotenv from "dotenv";
import AppStarter from "./app";
import AuthController from "./controllers/AuthController";
import prisma from "./config/DatabaseConnection";
import AuthService from "./services/Auth/AuthService";
import UserController from "./controllers/UserController";
import UserService from "./services/User/UserService";
import FoodController from "./controllers/FoodController";
import FoodService from "./services/Foods/FoodServices";

dotenv.config();

const PORT: string = process.env.PORT || "3000";

const app = new AppStarter(
  [
    new AuthController(new AuthService(prisma)),
    new UserController(new UserService(prisma)),
    new FoodController(new FoodService(prisma)),
  ],
  PORT
);
app.listenServer();
