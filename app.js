const express = require('express');
const bodyParser = require('body-parser');
const { routes: proverbRoutes } = require('./src/proverbs');

const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  next();
});
app.use(bodyParser.json());
app.use(proverbRoutes);

module.exports = app;
