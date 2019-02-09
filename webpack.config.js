const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'production',
  output: {
    path: distDir,
    filename: 'vue-confetti.js',
    library: 'vue-confetti',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      [`./dist`],
      {
        root: path.resolve('..'),
        verbose: false,
      }
    ),
  ],
};
