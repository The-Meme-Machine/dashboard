#!/home/ubuntu/.nvm/versions/node/v13.6.0/bin/node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3001;

// const https = require('https');
const compression = require('compression');
const helmet = require('helmet');
const history = require('connect-history-api-fallback');
const ip = require('ip');
const cors = require('cors');

const hardwareRouter = require('./routes/hardware');

var app = express();

app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.disable('x-powered-by');

app.use(cors());

app.use('/hardware', hardwareRouter);

app.use(history({
  index: '/'
}));

module.exports = app;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Local Address: http://localhost:${port}`);
  console.log(`LAN Address: http://${ip.address()}:${port}`)
})