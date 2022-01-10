const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    index: resolve(__dirname, "src/index.js"),
    post: resolve(__dirname, "src/post.js"),
    posts: resolve(__dirname, "src/posts.js"),
  },
  output: {
    path: resolve(`${__dirname}/dist`),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devServer: {
    compress: true,
    static: "dist",
    port: 9000,
    client: {
      logging: "info",
    },
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        options: {
          inlineRequires: /images/,
        },
      },
      {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/image/[contenthash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash][ext]",
        },
      },
    ],
  },
  mode: NODE_ENV === "production" ? "production" : "development",
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/hbs/index.handlebars"),
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/hbs/posts.handlebars"),
      filename: "posts.html",
      chunks: ["posts"],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/hbs/post.handlebars"),
      filename: "post.html",
      chunks: ["post"],
    }),
    new MiniCssExtractPlugin(),
  ],
};
