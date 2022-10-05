import "reflect-metadata";
import { container } from "tsyringe";
import UsageService from "../usage/usageService";
import Todo, { CreateTodoParams } from "./todo";
import TodoRepo from "./todoRepo";
import TodoService from "./todoService";

const createMockedTodoRepo = () => {
  const mockedTodoRepo: TodoRepo = {
    getTodos: jest.fn<Promise<Todo[]>, [string]>(),
    createTodo: jest.fn<Promise<Todo>, [string, CreateTodoParams]>(),
  } as unknown as TodoRepo;
  return mockedTodoRepo;
};

const createMockedUsageService = () => {
  const mockedUsageService = {
    increment: jest.fn<Promise<void>, [string]>(),
  };
  return mockedUsageService;
};

let mockTodoRepo: TodoRepo;
let mockedUsageService: UsageService;

describe("todoService", () => {
  beforeEach(() => {
    container.clearInstances();

    mockTodoRepo = createMockedTodoRepo();
    mockedUsageService = createMockedUsageService();

    container.registerInstance(TodoRepo, mockTodoRepo);
    container.registerInstance(UsageService, mockedUsageService);
  });

  it("should save the created todo", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };
    console.log(container);
    const todoService = container.resolve(TodoService);

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockTodoRepo.createTodo).lastCalledWith(userId, todo);
  });

  it("should increment the usage counter", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };

    const todoService = container.resolve(TodoService);

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockedUsageService.increment).lastCalledWith(userId);
  });
});
