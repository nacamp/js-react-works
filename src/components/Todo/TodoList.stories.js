import React from "react";
import { action } from "@storybook/addon-actions";
import { TodoList } from "../Todo/TodoList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: TodoList,
};

const Template = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  todoList: [
    { id: 1, text: "1번째", done: false, label: "오늘" },
    { id: 2, text: "2번째", done: true, label: "회사" },
    { id: 3, text: "3번째", done: false, label: "스터디" },
    { id: 4, text: "4번째", done: true, label: "프로젝트" },
    { id: 5, text: "5번째", done: false, label: "테스트" },
    { id: 6, text: "6번째", done: true, label: "운영" },
  ],
  setTodoList: action('checked'),
};
