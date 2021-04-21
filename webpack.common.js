const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js", // Desired file name. Same as in package.json's "main" field.
    path: path.resolve(__dirname, "dist"),
    library: "treex", // Desired name for the global variable when using as a drop-in script-tag.
    libraryTarget: "umd",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.tsx?/, // If you are using TypeScript: /\.tsx?$/
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  // If using TypeScript
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "dist", to: "../docs" },
      ],
    }),
  ],
};