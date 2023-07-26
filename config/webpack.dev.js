const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const ImageInlineSizeLimit = '10000';
const { resolve, join } = path;

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html'),
      favicon: resolve(__dirname, '../public/favicon.ico'),
      // manifest: resolve(__dirname, '../public/manifest.json'),
      chunks: ['index'],
    }),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
      }, {
        test: /\.less|css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: ImageInlineSizeLimit,
          },
        },
        generator: {
          filename: 'static/[name].[hash:10][ext]',
          publicPath: './',
        },
      },
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: join(__dirname, 'build'),
    },
    hot: true,
    compress: true,
    port: 8080
  },
});