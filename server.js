const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const fetch = require('node-fetch');
// .env files are not picked up by themselves. You need to use a package
// dotenv is for nodejs (DotenvPlugin is for webpack?)
// If it's for your react app then can use the suffix REACT_APP_ when naming variables in .env
require('dotenv').config();

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

/**
 * Simple API fetch get with API key only
 * GET https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}
 * spreadsheetId is on the url of the sheet itself
 * Go to https://developers.google.com/sheets/api/reference/rest for REST resources
 * Go to https://developers.google.com/sheets/api/guides/authorizing for Authorize requests
 * Authorizing requests explains how to use API key (no OAuth 2.0) for requests
 * Require the sheet to be public. This can be set by "Share" on the sheet itself
 */
app.get("/api/predictions/form/labels", async (req, res) => {
  const spreadsheetId = '100SvcRPQ_COd5xYAAvDvGcT2KYQa4uctsavZibcYTdY'
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${process.env.GOOGLE_API_KEY}`)
  const data = await response.json();
  console.log(data);
})

/**
 * Next: Authorization using a service account
 * If the application requests private user data then an an OAuth 2.0 token must be sent along with the request
 * Go here https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f for tutorial
 */

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});