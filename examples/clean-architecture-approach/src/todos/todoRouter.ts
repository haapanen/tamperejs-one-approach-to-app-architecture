import { TodoService } from "./todoService";
import express from "express";

const createTodoRouter = (todoService: TodoService) => {
  const todoRouter = express.Router();

  /**
   * Get todos for the user
   */
  todoRouter.get("/", async (req, res) => {
    return res.json(await todoService.getTodos(req.userId));
  });

  /**
   * Create a todo for the user
   */
  todoRouter.post("/", async (req, res) => {
    // ...input data validation...
    return res.json(await todoService.createTodo(req.userId, req.body));
  });

  return todoRouter;
};

export default createTodoRouter;
