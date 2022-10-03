import Todo, { CreateTodoParams } from "./todo";
import postgres from "postgres";

const sql = postgres({});

/**
 * Data access interface for todos
 */
const createTodoRepo = (sql: postgres.Sql<{}>) => ({
  /**
   * Get all todos for the user
   * @param userId
   * @returns
   */
  getTodos: (userId: string): Promise<Todo[]> => {
    return sql<Todo[]>`
            select * from todos where userId = ${userId}
        `;
  },

  /**
   * Create a todo for the user
   * @param userId
   * @param todo
   * @returns
   */
  createTodo: async (userId: string, todo: CreateTodoParams) => {
    const result = await sql<Todo[]>`
      insert into todos (userId, text, completed) values (${userId}, ${todo.text}, ${todo.completed})
      returning *
    `;

    return result[0];
  },
});

export type TodoRepo = ReturnType<typeof createTodoRepo>;

export default createTodoRepo;
