const express = require('express')
const app = express()
const path = require('path');

// app.use('/app', express.static(path.join(__dirname, './app')));
// Step 1: Create & configure a webpack compiler
const webpack = require('webpack');
const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './app/webpack.dev.config');
const compiler = webpack(webpackConfig);

const middleware = require("webpack-dev-middleware");
// Step 2: Attach the dev middleware to the compiler & the server
app.use(middleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, heartbeat: 10 * 1000
}));

app.listen(8080, function () {
  console.log('Rainpools app listening on port 8080!')
})
