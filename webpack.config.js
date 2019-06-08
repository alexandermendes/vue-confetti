const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    'vue-confetti': [
      path.resolve(__dirname, 'src', 'index.js')
    ],
    demo: [
      path.resolve(__dirname, 'demo', 'demo.js'),
    ]
  },

  mode: isDev ? 'development' : 'production',

  devtool: isDev ? 'cheap-module-source-map' : false,

  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'vue-confetti',
    libraryTarget: 'umd',
    filename: isDev ? '[name].[chunkhash].js' : '[name].js', // Hash for the demo only
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
        sourceMap: isDev,
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

    new CopyWebpackPlugin([
      {
        from:'./demo/svgs',
        to:'svgs',
      },
    ]),
  ],
};
