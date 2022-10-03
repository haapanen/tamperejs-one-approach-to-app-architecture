import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./todos/todoRouter";

const app = express();

app.use(bodyParser.json());
/**
 * Imagine this was a proper auth
 */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers["x-user-id"]) {
      req.userId = req.headers["x-user-id"] as string;
    } else {
      req.userId = "1";
    }
    next();
  }
);

app.use("/api/todo", todoRouter);

export default app;
