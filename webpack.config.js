// const { mode } = require("webpack-nano/argv");
const mode = process.env.mode;
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

const commonConfig = merge([{ entry: ["./src"] }, parts.loadPostcss(), parts.page({ title: "Demo" })]);
const productionConfig = merge([]);
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
