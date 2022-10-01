const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  // entry: './src/index.js',
  entry: ['./src/app.scss', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"], // This is important to getting the css to load!
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'bundle.css',
          //   },
          // },
          // { loader: 'extract-loader' },
          // { loader: 'css-loader' },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         autoprefixer()
          //       ]
          //     }
          //   } 
          // },
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     // Prefer Dart Sass
          //     implementation: require('sass'),

          //     // See https://github.com/webpack-contrib/sass-loader/issues/804
          //     webpackImporter: false,
          //     sassOptions: {
          //       includePaths: ['./node_modules']
          //     },
          //   },
          // },
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html', inject: 'body'}),
    new MiniCssExtractPlugin()
  ]
};