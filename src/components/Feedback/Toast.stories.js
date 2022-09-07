import React from "react";
import { action } from "@storybook/addon-actions";
import { Toast } from "../Feedback";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'components/Feedback/Toast',
  component: Toast,
};

const Template = (args) => <Toast {...args} />;
export const Default = Template.bind({});
Default.args = {
  open: false,
  message: "title",
  severity: "success",
  onClose: action("clicked"),
};