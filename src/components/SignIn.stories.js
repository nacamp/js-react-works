import React from 'react';
import { action } from '@storybook/addon-actions'
import SignIn from './SignIn';

export default {
  title: 'SignIn',
  component: SignIn,
};

const Template = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit:  action('email', 'password'),
};