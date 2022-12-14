const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const path = require("path");
const postcssPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("tailwindcss")(), require("autoprefixer")];
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));

exports.devServer = () => ({
  devServer: {
    host: "local-ip",
    liveReload: true,
    port: parseInt(process.env.PORT, 10) || 8080,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
});

exports.page = ({ title, url = "", chunks } = {}) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      publicPath: "/",
      chunks,
      filename: `${url && url + "/"}index.html`,
      context: { title },
    }),
  ],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

exports.extractCss = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader, options }, "css-loader"].concat(loaders),
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
});

exports.tailwind = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: postcssPlugins,
    },
  },
});

exports.eliminateUnusedCss = () => ({
  plugins: [
    new PurgeCssPlugin({
      paths: ALL_FILES, // Consider extracting as a parameter
      extractors: [
        {
          extractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html"],
        },
      ],
    }),
  ],
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
});

/* Warning
You should configure your server to disallow access to the Source Map file for normal users! */
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.clean = () => ({
  output: {
    clean: true,
  },
});

exports.minifyJavaScript = () => ({
  optimization: { minimizer: [new TerserPlugin()] },
});

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin({ minimizerOptions: options })],
  },
});

exports.readEnvironmentVariables = () => ({
  // Prefix was set so you don't have to type "process.env."
  plugins: [new Dotenv({ prefix: "" })],
});
