import Todo, { CreateTodoParams } from "./todo";
import postgres from "postgres";
import { singleton } from "tsyringe";
import Database from "../data/database";

/**
 * Data access interface for todos
 */
@singleton()
class TodoRepo {
  constructor(private database: Database) {}

  /**
   * Get all todos for the user
   * @param userId
   * @returns
   */
  getTodos = (userId: string): Promise<Todo[]> => {
    return this.database.sql<Todo[]>`
            select * from todos where userId = ${userId}
        `;
  };

  /**
   * Create a todo for the user
   * @param userId
   * @param todo
   * @returns
   */
  createTodo = async (userId: string, todo: CreateTodoParams) => {
    const result = await this.database.sql<Todo[]>`
      insert into todos (userId, text, completed) values (${userId}, ${todo.text}, ${todo.completed})
      returning *
    `;

    return result[0];
  };
}

export default TodoRepo;
