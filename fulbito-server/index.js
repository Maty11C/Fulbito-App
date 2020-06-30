const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const partidoRouter = require('./routers/partidoRouter')
const equipoRouter = require('./routers/equipoRouter')
const usuarioRouter = require('./routers/usuarioRouter')

// DATABASE
const databaseConnection = require("./database/connection")

// SERVER
const app = express();

app.use(bodyParser.json());
app.use(cors());

var port = process.env.port || 8081;

app.listen(port, function () {
  console.log("Server listening on port 8081!");
});

app.use('/partidos', partidoRouter)
app.use('/equipos', equipoRouter)
app.use('/usuarios', usuarioRouter)