var express = require('express');
var app = express();
var mysql = require('mysql');

// SERVER
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8081, function () {
  console.log('Server listening on port 8081!');
});

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