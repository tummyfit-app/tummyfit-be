import dotenv from "dotenv";
import AppStarter from "./app";
import AuthController from "./controller/Auth/AuthController";
import prisma from "./config/DatabaseConnection";
import AuthService from "./services/Auth/AuthService";
import UserController from "./controller/User/UserController";
import UserService from "./services/User/UserService";
dotenv.config();

const PORT: string = process.env.PORT || "3000";

const app = new AppStarter(
  [
    new AuthController(new AuthService(prisma)),
    new UserController(new UserService(prisma)),
  ],
  PORT
);
app.listenServer();
