import React from "react";
import { action } from "@storybook/addon-actions";
import { Calendar } from "./Calendar";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  yearMonth: "202209",
  onOpen: action(1),
};

export const Date202208 = Template.bind({});
Date202208.args = {
  yearMonth: "202208",
  onOpen: action(1),
};