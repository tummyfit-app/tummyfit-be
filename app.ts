import express, { Application } from "express";
import { Controller } from "./interfaces/Controller";

class AppStarter {
  private express: Application;
  private port: string;
  constructor(private controllers: Controller[], port: string) {
    this.express = express();
    this.port = port;
    this.initMiddleware();
    this.initControllers(controllers);
  }

  private initMiddleware() {
    this.express.use(express.json());
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
