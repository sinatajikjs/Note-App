const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
