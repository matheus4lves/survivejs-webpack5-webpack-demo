const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const path = require("path");
const { mergeWithRules } = require("webpack-merge");
const postcssPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")];

const cssConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

const postcssConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
        ],
      },
    ],
  },
};

const mergedCssConfig = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: {
        loader: "match",
        options: "replace",
      },
    },
  },
})(cssConfig, postcssConfig);

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

exports.loadCSS = () => cssConfig;

exports.loadPostcss = () => mergedCssConfig;
