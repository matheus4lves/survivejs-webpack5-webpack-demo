const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoaders = [parts.tailwind()];
const path = require("path");
const { argv } = require("process");

const commonConfig = merge([{ output: { chunkFilename: "[name].[contenthash].js", filename: "[name].[contenthash].js", assetModuleFilename: "[name].[contenthash].[ext].[query]" } }, { entry: ["./src"] }, parts.extractCss({ loaders: cssLoaders }), parts.page({ title: "Demo" }), parts.loadImages({ limit: 8192 }), parts.clean(), parts.readEnvironmentVariables()]);
const productionConfig = merge([parts.minifyCSS({ options: { preset: ["default"] } }), parts.minifyJavaScript(), parts.eliminateUnusedCss(), parts.loadJavaScript(), parts.generateSourceMaps({ type: "source-map" }), { optimization: { splitChunks: { chunks: "all" }, runtimeChunk: { name: "runtime" } } }, { recordsPath: path.join(__dirname, "records.json") }]);
const developmentConfig = merge([parts.devServer()]);

const getConfig = mode => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
