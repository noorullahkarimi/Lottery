const path = require("path");

module.exports = {
  entry: "./src/cdn.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cdn.js"
  },
  resolve: {
   fallback: { "querystring": require.resolve("querystring-es3") }
}
};