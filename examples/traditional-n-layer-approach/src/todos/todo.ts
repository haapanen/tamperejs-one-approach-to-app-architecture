interface Todo {
  id: number;
  userId: string;
  text: string;
  completed: boolean;
}

export type CreateTodoParams = Pick<Todo, "text" | "completed">;

export default Todo;
