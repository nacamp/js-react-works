import { initialize, mswDecorator } from 'msw-storybook-addon';
// Initialize MSW
initialize();

window.sessionStorage.setItem(
  "token",
  process.env.TOKEN
);

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];