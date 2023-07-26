const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const ImageInlineSizeLimit = '10000';
const { resolve } = path;

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../public'),
          to: 'public'
        }, {
          from: resolve(__dirname, '../public/manifest.json'),
          to: './'
        },
      ]
    }),
    new MiniCssExtractPlugin(),
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
          MiniCssExtractPlugin.loader,
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
          // filename: 'static/[name][ext]',
          filename: 'static/[name].[hash:10][ext]',
          publicPath: './',
        },
      },
    ]
  },
  mode: 'production',
  performance: {
    hints: false,
  },
  devtool: 'cheap-module-source-map',
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  }
});