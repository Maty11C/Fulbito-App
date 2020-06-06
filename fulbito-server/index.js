var express = require("express");
var bodyParser = require("body-parser");
const Partido = require("./database/connection");
const moment = require("moment");
var app = express();

// SERVER
app.use(bodyParser.json());

app.get("/partidos/:id", function (request, response) {
  Partido.findAll({
    where: {
      id: request.params.id,
    },
  }).then(function (partido) {
    response.send(partido);
  });
});

app.post("/partidos", function (request, response) {
  Partido.create({
    fecha: moment(request.body.fecha, "DD/MM/YYYY"),
    hora: request.body.hora,
    lugar: request.body.lugar,
  }).then(function (partido) {
    if (partido) {
      response.send(partido);
    } else {
      response.status(400).send("Error al crear el partido");
    }
  });
});

app.listen(8081, function () {
  console.log("Server listening on port 8081!");
});
