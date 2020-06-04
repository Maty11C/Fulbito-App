var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// DATABASE
require('./database/connection')

// SERVER
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8081, function () {
  console.log('Server listening on port 8081!');
});