var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// DATABASE
require('./database/connection')

// SERVER
app.use(bodyParser.json());

const partidoRouter = require('./routers/partidoRouter')

app.use('/partido', partidoRouter)

app.listen(8081, function () {
  console.log("Server listening on port 8081!");
});
