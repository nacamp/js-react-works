import React from 'react';
import { action } from '@storybook/addon-actions'
import {Fallback} from '../Feedback';


export default {
  component: Fallback,
};

const Template = (args) => <Fallback {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false
};