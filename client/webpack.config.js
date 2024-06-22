const path = require("path");

module.exports = {
  // other webpack configuration options...

  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
    },
  },
};
