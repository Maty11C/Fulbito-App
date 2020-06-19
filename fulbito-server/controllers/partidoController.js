const moment = require("moment");

const { Partido } = require("../database/connection");

exports.obtenerPartidoPorId = (req, res) => {
  Partido.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({
        message: "No se encontró el partido",
      });
    });
};

exports.obtenerTodosLosPartidos = (req,res) => {
  Partido.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({
        message: "No se pudieron obtener los partidos",
      });
    });
};

exports.crearPartido = (req, res) => {
  // Validaciones
  var fechaPartido = req.body.fecha;
  const horaPartido = req.body.hora;
  const lugarPartido = req.body.lugar;
  if (fechaPartido === '') {
    res.status(400).send({
      message: "La fecha es obligatoria",
    });
    return
  }
  if (horaPartido === '') {
    res.status(400).send({
      message: "La hora es obligatoria",
    });
    return
  }
  if (lugarPartido === '') {
    res.status(400).send({
      message: "El lugar es obligatorio",
    });
    return
  }
  fechaPartido = moment(fechaPartido, "YYYY-MM-DD").startOf('day');
  if (fechaPartido.isBefore(moment().startOf('day'))) {
    res.status(400).send({
      message: "La fecha es inválida",
    });
    return
  }
  // Guardado
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
};

exports.editarPartido = (req, res) => {
  const fechaPartido = req.body.fecha ? moment(req.body.fecha, "YYYY-MM-DD").startOf('day') : undefined;
  const horaPartido = req.body.hora;
  const lugarPartido = req.body.lugar;
  if (fechaPartido && fechaPartido.isBefore(moment().startOf('day'))) {
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

exports.eliminarTodosLosPartidos = (req, res) => {
  Partido.destroy({ where: {}, truncate: true })
    .then((data) => {
      res.send({
        message: "Se eliminaron los partidos",
      });
    })
    .catch(() => {
      res.status(404).send({
        message: "No se pudieron eliminar los partidos",
      });
    });
};