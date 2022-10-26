const mode = process.env.mode;
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoaders = [parts.tailwind()];

const commonConfig = merge([{ entry: ["./src"] }, parts.extractCss({ loaders: cssLoaders }), parts.page({ title: "Demo" }), parts.loadImages({ limit: 8192 })]);
const productionConfig = merge([parts.eliminateUnusedCss(), parts.loadJavaScript(), parts.generateSourceMaps({ type: "source-map" }), { optimization: { splitChunks: { chunks: "all" } } }]);
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
