const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    'vue-confetti': [
      path.resolve(__dirname, 'src', 'index.js')
    ],
    demo: [
      path.resolve(__dirname, 'demo', 'demo.js'),
    ]
  },

  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
      [ 'dist' ],
      {
        root: __dirname,
      }
    ),

    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Vue Confetti Demo',
      appMountId: 'app',
    }),

    new VueLoaderPlugin(),
  ],
};
