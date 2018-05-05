const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

const Paths = {
  ROOT: path.join(__dirname, '../..'),
};

module.exports = {
  entry: {
    bundle: ['./index.ts'],
  },
  context: path.resolve(__dirname),
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'tmp'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:4]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(Paths.ROOT, 'postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new CheckerPlugin()],
};
