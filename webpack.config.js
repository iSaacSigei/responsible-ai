const path = require('path');

module.exports = {
  // Other configuration options...
  module: {
    rules: [
      // Your loaders and rules here...
    ],
  },
  plugins: [
    // Your plugins here...
  ],
  resolve: {
    // Your resolve options here...
  },
  ignoreWarnings: [
    {
      module: /react-credit-cards-2\/dist\/es\/index\.js/,
      message: /Failed to parse source map/,
    },
  ],
};
