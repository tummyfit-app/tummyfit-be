import express, { Application, NextFunction, Request, Response } from "express";
import { Controller } from "./interfaces/Controller";
import middlewareError from "./middlewares/ErrorMiddleware";
import AppError from "./utils/AppError";
import swaggerUI from "swagger-ui-express";
import * as swaggerDoc from "./apidocs.json";
import cors from "cors";

class AppStarter {
  private express: Application;
  private port: string;
  private options: object;
  constructor(private controllers: Controller[], port: string) {
    this.express = express();
    this.port = port;
    this.options = {
      customSiteTitle: "Tummyfit",
    };
    this.initMiddleware();
    this.initControllers(controllers);
    this.express.all(
      "*",
      (req: Request, response: Response, next: NextFunction) => {
        next(
          new AppError(`cant find ${req.originalUrl} on this server`, "404")
        );
      }
    );
    this.express.use(middlewareError);
  }

  private initMiddleware() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDoc, this.options)
    );
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  public listenServer() {
    this.express.listen(this.port, () => {
      console.log("Server is is listening to port " + this.port);
    });
  }
}
export default AppStarter;
