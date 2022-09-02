import React from 'react';
import { action } from '@storybook/addon-actions'
import {Toast} from '../Feedback';


export default {
  component: Toast,
};

const Template = (args) => <Toast {...args} />;
export const Default = Template.bind({});
Default.args = {
  open: false,
  message: 'title',
  severity: 'success',
  onClose: action('clicked')
};

// export const Toast_Open = Template2.bind({});
// Toast_Open.args = {
//   open: true,
//   message: 'title',
//   severity: 'success',
//   onClose: action('clicked')
// };