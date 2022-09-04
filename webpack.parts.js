const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const path = require("path");
const postcssPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("tailwindcss")(), require("autoprefixer")];
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

exports.page = ({ title }) => ({
  plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
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
      filename: "[name].css",
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
