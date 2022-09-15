import routes from "./routes";
import { StatusCode } from "./utils";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import express, { Request, Response } from "express";

export class App {
  public app: express.Application = express();
  port: number | string = process.env.PORT || 3000;
  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(
        `App listening on port ${this.port} ${
          process.env.NODE_ENV || "development"
        }`
      );
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(this.limiter);
    this.app.set("trust proxy", true);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      return res.status(StatusCode.OK).json({
        data: {
          hello: "👋",
        },
      });
    });
    this.app.use(routes);

    this.app.all("*", (req: Request, res: Response) => {
      return res.status(StatusCode.NOT_FOUND).json({
        status: false,
        error: "route not found",
        path: req.url,
        data: {},
      });
    });
  }

  private limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 1000, // 1 second in milliseconds
    max: 2,
    standardHeaders: false,
    legacyHeaders: false,
    onLimitReached: (req, res) => {
      return res.status(StatusCode.TOO_MANY_REQUESTS).json({
        message: "You have exceeded the 3 requests in 1 second limit!",
      });
    },
  });
}
