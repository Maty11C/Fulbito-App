const moment = require("moment");

const router = require("express").Router();

const { Partido } = require("../database/connection");

// Se obtiene el partido por id
router.get("/:id", async (req, res) => {
  const partido = await Partido.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json(partido);
});

// Se obtienen todos los partidos
router.get("/", async (req, res) => {
  const partidos = await Partido.findAll();
  res.json(partidos);
});

// Se crea partido a partir de fecha, hora y lugar
router.post("/", function (request, response) {
  Partido.create({
    fecha: moment(request.body.fecha, "YYYY-MM-DD"),
    hora: request.body.hora,
    lugar: request.body.lugar,
  })
    .then(function (partido) {
      response.status(200).send(partido);
    })
    .catch(function () {
      response.status(400).send("No se pudo crear el partido");
    });
});

module.exports = router;
