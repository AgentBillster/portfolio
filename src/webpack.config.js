// webpack.config.js
module.exports = {
  // ...the rest of your config

  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
    },
  },
};
