const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,

  devtool: 'cheap-module-source-map',

  entry:  [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './main.js',
    './index.html'
  ],

  output: {
      path: '/dist',
      publicPath: '/',
      filename: 'bundle.js'
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
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.less$/,
          /\.scss$/,
          /\.json$/,
        ],
        loader: 'url-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
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
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}
