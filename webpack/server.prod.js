const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nib = require('nib');

const res = p => path.resolve(__dirname, p);

const externals = fs
  .readdirSync(res('../node_modules'))
  .filter(x =>
    !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x))
  .reduce((acc, key) => ({
    ...acc,
    [key]: `commonjs ${key}`,
  }), {});

module.exports = {
  name: 'server',
  target: 'node',
  entry: [res('../server/render.jsx')],
  externals,
  output: {
    path: res('../buildServer'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          }, {
            loader: 'stylus-loader',
            options: {
              use: [nib()],
              import: ['~nib/lib/nib/index.styl'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.styl'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
