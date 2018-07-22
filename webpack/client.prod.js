const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const nib = require("nib");

module.exports = {
  mode: "production",
  name: "client",
  target: "web",
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "../buildClient"),
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.styl$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          },
          {
            loader: "stylus-loader",
            options: {
              use: [nib()],
              import: ["~nib/lib/nib/index.styl"],
              preferPathResolver: "webpack"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".styl"],
    alias: {
      components: path.resolve(__dirname, "../src/components"),
      containers: path.resolve(__dirname, "../src/containers"),
      routes: path.resolve(__dirname, "../src/routes"),
      manifests: path.resolve(__dirname, "../src/manifests"),
      images: path.resolve(__dirname, "../src/images"),
      actions: path.resolve(__dirname, "../src/actions"),
      reducers: path.resolve(__dirname, "../src/reducers"),
      selectors: path.resolve(__dirname, "../src/selectors")
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /bootstrap/,
          priority: -10
        },
        default: {
          minChunks: Infinity,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true
  },
  plugins: [
    new StatsPlugin("stats.json"),
    new ExtractCssChunks(),
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "CRAFTING_CONTENT",
      "CRAFTING_FORMSPREE_ID"
    ]),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    new AutoDllPlugin({
      context: path.join(__dirname, ".."),
      filename: "[name].js",
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        }),
      ],
      entry: {
        vendor: [
          "react",
          "react-dom",
          "react-redux",
          "redux",
          "history/createBrowserHistory",
          "transition-group",
          "redux-first-router",
          "redux-first-router-link",
          "redux-devtools-extension"
        ]
      }
    })
  ]
};
