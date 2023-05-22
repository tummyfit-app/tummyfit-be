import { CustomError } from "../middlewares/ErrorMiddleware";

class AppError extends Error implements CustomError {
  constructor(message: string, public statusCode: string) {
    super(message);
  }
  public code: string = "";
  public meta = {
    target: "",
  };
}

export default AppError;
