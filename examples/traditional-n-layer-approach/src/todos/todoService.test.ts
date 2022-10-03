import todoService from "./todoService";
import todoRepo from "./todoRepo";
import usageService from "../usage/usageService";

jest.mock("./todoRepo");
jest.mock("../usage/usageService");

const mockTodoRepo = todoRepo as jest.Mocked<typeof todoRepo>;
const mockedUsageService = usageService as jest.Mocked<typeof usageService>;

describe("todoService", () => {
  it("should save the created todo", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockTodoRepo.createTodo).lastCalledWith(userId, todo);
  });

  it("should increment the usage counter", async () => {
    const userId = "user1";
    const todo = {
      text: "Improve the architecture",
      completed: false,
    };

    const createdTodo = await todoService.createTodo(userId, todo);

    expect(mockedUsageService.increment).lastCalledWith(userId);
  });
});
