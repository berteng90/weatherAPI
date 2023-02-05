const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: "./dist",
  },
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
