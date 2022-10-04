import { singleton } from "tsyringe";
import UsageService from "../usage/usageService";
import { CreateTodoParams } from "./todo";
import TodoRepo from "./todoRepo";

/**
 * Business logic for managing todos
 */
@singleton()
class TodoService {
  constructor(private todoRepo: TodoRepo, private usageService: UsageService) {}

  /**
   * Get todos for the user
   * @param userId
   * @returns
   */
  getTodos = (userId: string) => {
    return this.todoRepo.getTodos(userId);
  };

  /**
   * Create a todo for the user
   * @param userId
   * @param todo
   * @returns
   */
  createTodo = async (userId: string, todo: CreateTodoParams) => {
    const createdTodo = await this.todoRepo.createTodo(userId, todo);

    await this.usageService.increment(userId);

    return createdTodo;
  };
}

export default TodoService;
