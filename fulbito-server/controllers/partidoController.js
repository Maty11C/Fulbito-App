const moment = require("moment");

const { Partido } = require("../database/connection");

exports.obtenerPartidoPorId = (req, res) => {
  Partido.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({
        message: "No se encontró el partido",
      });
    });
};

exports.obtenerTodosLosPartidos = (res) => {
  Partido.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({
        message: "No se pudieron obtener los partidos",
      });
    });
};

exports.crearPartido = (req, res) => {
  const fechaPartido = moment(req.body.fecha, "YYYY-MM-DD");
  const horaPartido = req.body.hora;
  const lugarPartido = req.body.lugar;
  if (fechaPartido.isBefore(moment())) {
    res.status(400).send({
      message: "La fecha es inválida",
    });
  } else {
    const partido = {
      fecha: fechaPartido,
      hora: horaPartido,
      lugar: lugarPartido,
    };
    Partido.create(partido)
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(500).send({
          message: "No se pudo crear el partido",
        });
      });
  }
};

exports.editarPartido = (req, res) => {
  const fechaPartido = req.body.fecha ? moment(req.body.fecha, "YYYY-MM-DD") : undefined;
  const horaPartido = req.body.hora;
  const lugarPartido = req.body.lugar;
  if (fechaPartido && fechaPartido.isBefore(moment())) {
    res.status(400).send({
      message: "La fecha es inválida",
    });
  } else {
    Partido.update(
      {
        fecha: fechaPartido,
        hora: horaPartido,
        lugar: lugarPartido,
      },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send({
          message: "El partido se actualizó exitosamente",
        });
      })
      .catch(() => {
        res.status(500).send({
          message: "No se pudo editar el partido",
        });
      });
  }
};
