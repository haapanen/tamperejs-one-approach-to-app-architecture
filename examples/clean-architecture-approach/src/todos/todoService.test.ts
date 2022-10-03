import Todo, { CreateTodoParams } from "./todo";
import { TodoRepo } from "./todoRepo";
import createTodoService from "./todoService";

const createMockedTodoRepo = () => {
  const mockedTodoRepo: TodoRepo = {
    getTodos: jest.fn<Promise<Todo[]>, [string]>(),
    createTodo: jest.fn<Promise<Todo>, [string, CreateTodoParams]>(),
  };
  return mockedTodoRepo;
};

const createMockedUsageService = () => {
  const mockedUsageService = {
    increment: jest.fn<Promise<void>, [string]>(),
  };
  return mockedUsageService;
};

const mockTodoRepo = createMockedTodoRepo();
const mockedUsageService = createMockedUsageService();

describe("todoService", () => {
  it("should save the created todo", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };
    const todoService = createTodoService(mockTodoRepo, mockedUsageService);

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockTodoRepo.createTodo).lastCalledWith(userId, todo);
  });

  it("should increment the usage counter", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };

    const todoService = createTodoService(mockTodoRepo, mockedUsageService);

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockedUsageService.increment).lastCalledWith(userId);
  });
});
