import express from "express";
import { singleton } from "tsyringe";
import TodoService from "./todoService";

@singleton()
class TodoRouter {
  constructor(private todoService: TodoService) {}

  getRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
      return res.json(await this.todoService.getTodos(req.userId));
    });

    router.post("/", async (req, res) => {
      // ...input data validation...
      return res.json(await this.todoService.createTodo(req.userId, req.body));
    });

    return router;
  }
}

export default TodoRouter;
