import usageService from "../usage/usageService";
import { CreateTodoParams } from "./todo";
import todoRepo from "./todoRepo";

/**
 * Business logic for managing todos
 */
const todoService = {
  /**
   * Get todos for the user
   * @param userId
   * @returns
   */
  getTodos: (userId: string) => {
    return todoRepo.getTodos(userId);
  },

  /**
   * Create a todo for the user
   * @param userId
   * @param todo
   * @returns
   */
  createTodo: async (userId: string, todo: CreateTodoParams) => {
    const createdTodo = await todoRepo.createTodo(userId, todo);

    await usageService.increment(userId);

    return createdTodo;
  },
};

export default todoService;
