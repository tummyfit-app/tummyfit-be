import dotenv from "dotenv";
import AppStarter from "./app";
import AuthController from "./controller/Auth/AuthController";
import prisma from "./config/DatabaseConnection";
import AuthService from "./services/Auth/AuthService";
import UserController from "./controller/User/UserController";
import UserService from "./services/User/UserService";
// import fs from "fs";
// import csv from "csv-parser";
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

// const result: any[] = [];

// fs.createReadStream("./seeders/tummyfit_dataset_preprocessed.csv")
//   .pipe(csv())
//   .on("data", (data) => {
//     result.push(data);
//   })
//   .on("end", () => {
//     console.log(result[0]);
//   });
