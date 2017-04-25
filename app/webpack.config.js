const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,

  devtool: 'cheap-module-source-map',

  entry: {
    javascript: ["./main.js", 'webpack-hot-middleware/client'],
    html: ["./index.html", 'webpack-hot-middleware/client'],
  },

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, './main/js'),
  },

  plugins: [
      // OccurenceOrderPlugin is needed for webpack 1.x only
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
}
