  module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  staticDirs: ["../public"],
  addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
      builder: "@storybook/builder-webpack5",
  },
  features: {
      interactionsDebugger: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
