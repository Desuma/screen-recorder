const path = require('path');

const { resolve } = path;

module.exports = {
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    'index': resolve(__dirname, '../src'),
    // 'background/index': resolve(__dirname, '../src/background'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../build'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      '~': resolve(__dirname, '../src')
    }
  },
};