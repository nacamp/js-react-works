import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../test/renderWithProviders";
import { useGetTodo, usePutTodo, usePostTodo } from "../hooks/api";
import { TodoTitle, TodoTemplate } from "./TodoTemplate";

jest.mock("../hooks/token", () => {
  const originalModule = jest.requireActual("../hooks/token");
  return {
    __esModule: true,
    ...originalModule,
    // default: jest.fn(() => 'mocked baz'),
    getToken: () => "bypass", // jest.fn 울 하면 안된다.
  };
});

describe("TodoTemplate", () => {
  test("display todo list", async () => {
    render(
      <TodoTemplate
        id={20220903}
        onGet={useGetTodo}
        onPut={usePutTodo}
        onPost={usePostTodo}
      >
        <TodoTitle id={20220903} />
      </TodoTemplate>
    );
    await waitFor(() => {
      expect(screen.getByText("20220903 스터디")).toBeInTheDocument();
    });
    // screen.debug();
  });
});
