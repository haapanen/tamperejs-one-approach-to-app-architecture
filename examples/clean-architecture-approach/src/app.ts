import express from "express";
import bodyParser from "body-parser";
import createTodoRouter from "./todos/todoRouter";
import createTodoService from "./todos/todoService";
import createTodoRepo from "./todos/todoRepo";
import postgres from "postgres";
import createUsageService from "./usage/usageService";

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

app.use(
  "/api/todo",
  // Build the dependency tree
  createTodoRouter(
    createTodoService(createTodoRepo(postgres({})), createUsageService())
  )
);

export default app;
