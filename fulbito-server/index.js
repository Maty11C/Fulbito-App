var express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors')
const partidoRouter = require('./routers/partidoRouter')
var app = express();

// SERVER
app.use(bodyParser.json());
app.use(cors());
app.use('/partidos', partidoRouter)

var port = process.env.port || 8081;

app.listen(port, function () {
  console.log("Server listening on port 8081!");
});
