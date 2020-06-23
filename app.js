#!/home/ubuntu/.nvm/versions/node/v13.6.0/bin/node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3001;

const https = require('https');
const compression = require('compression');
const helmet = require('helmet');
const history = require('connect-history-api-fallback');

var app = express();

app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.disable('x-powered-by');

module.exports = app;

app.use(history({
  index: '/'
}));

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})