// webpack.config.js
module.exports = {
  // ...the rest of your config

  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-animated-cursor": "react-animated-cursor",
    },
  },
};
