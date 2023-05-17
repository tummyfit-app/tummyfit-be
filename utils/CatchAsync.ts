import { NextFunction, Request, Response } from "express";

const wrapAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      next(err);
    });
  };
};

export default wrapAsync;
