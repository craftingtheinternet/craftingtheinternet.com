const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const OptimizeJsPlugin = require("optimize-js-plugin");
const nib = require("nib");

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    screw_ie8: true,
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    screw_ie8: true,
    comments: false
  },
  sourceMap: false
});

module.exports = {
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
        use: ExtractCssChunks.extract({
          use: [
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
        })
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
  plugins: [
    new StatsPlugin("stats.json"),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["bootstrap"], // need to put webpack bootstrap code before chunks
      filename: "[name].[chunkhash].js",
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        CRAFTING_CONTENT: JSON.stringify(process.env.CRAFTING_CONTENT),
        CRAFTING_FORMSPREE_ID: JSON.stringify(process.env.CRAFTING_FORMSPREE_ID)
      }
    }),
    new PrepackWebpackPlugin(),
    uglify,
    new OptimizeJsPlugin({
      sourceMap: false
    }),
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
        new PrepackWebpackPlugin(),
        uglify,
        new OptimizeJsPlugin({
          sourceMap: false
        })
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
