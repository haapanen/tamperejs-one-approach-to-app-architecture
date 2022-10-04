import express from "express";
import bodyParser from "body-parser";
import postgres from "postgres";
import createUsageService from "./usage/usageService";
import { container } from "tsyringe";
import TodoRouter from "./todos/todoRouter";
import Database from "./data/database";

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

container.registerInstance(
  Database,
  new Database({
    host: process.env.PGHOST ?? "localhost",
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER ?? "postgres",
    password: process.env.PGPASSWORD ?? "postgres",
    database: process.env.PGDATABASE ?? "postgres",
  })
);

app.use(
  "/api/todo",
  // Build the dependency tree
  container.resolve(TodoRouter).getRouter()
);

export default app;
