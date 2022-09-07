import React from "react";
// import { action } from "@storybook/addon-actions";
import { TodoCreate } from "../Todo/TodoCreate";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'components/Todo/TodoCreate',
  component: TodoCreate,
};

const Template = (args) => <TodoCreate {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelList: [
    { id: 1, text: "오늘", done: true, label: "오늘1" },
    { id: 2, text: "내일", done: true, label: "내일1" },
  ],
};

export const Routine = Template.bind({});
Routine.args = {
  labelList: [
    { id: 1, text: "오늘", done: true, label: "오늘1" },
    { id: 2, text: "내일", done: true, label: "내일1" },
  ],
  routineLabel: "내일",
};
