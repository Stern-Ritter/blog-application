const { resolve } = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HandlebarsWebpackPlugin = require("handlebars-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
  entry: resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: resolve(`${__dirname}/dist`),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devServer: {
    compress: true,
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
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  mode: NODE_ENV === "production" ? "production" : "development",
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new HandlebarsWebpackPlugin({
      htmlWebpackPlugin: {
        enabled: true,
      },
      entry: resolve(process.cwd(), "src", "hbs", "*.hbs"),
      output: resolve(process.cwd(), "dist", "[name].html"),
      partials: [resolve(process.cwd(), "src", "hbs", "*", "*.hbs")],
    }),
    new MiniCssExtractPlugin(),
  ],
};
