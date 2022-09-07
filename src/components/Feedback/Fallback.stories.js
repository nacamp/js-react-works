import React from "react";
// import { action } from '@storybook/addon-actions'
import { Fallback } from "../Feedback";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'components/Feedback/Fallback',
  component: Fallback,
};

const Template = (args) => <Fallback {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false,
};
