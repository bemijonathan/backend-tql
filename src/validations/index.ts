import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../utils";

class RouteValidators {
  howOld(req: Request, res: Response, next: NextFunction) {
    if (!req.query.dob) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        message: "dob is a required params",
        path: req.url,
      });
    }
    next();
  }
}

export default new RouteValidators();
