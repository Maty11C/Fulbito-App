var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json())

// SERVER
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8081, function () {
  console.log('Server listening on port 8081!');
});

var mysql = require('mysql');

// DATABASE
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fulbito'
})

connection.connect(
  function(error) {
    if(!!error) {
      console.log('Error')
    }
    else {
      console.log('Database connected')
    }
  }
)