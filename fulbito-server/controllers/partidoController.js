const moment = require("moment");

const { Partido, Equipo } = require("../database/connection");

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

exports.obtenerTodosLosPartidos = (req, res) => {
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
  const equipos = req.body.equipos;
  if (fechaPartido === "") {
    res.status(400).send({
      message: "La fecha es obligatoria",
    });
    return;
  }
  if (horaPartido === "") {
    res.status(400).send({
      message: "La hora es obligatoria",
    });
    return;
  }
  if (lugarPartido === "") {
    res.status(400).send({
      message: "El lugar es obligatorio",
    });
    return;
  }
  fechaPartido = moment(fechaPartido, "YYYY-MM-DD").startOf("day");
  if (fechaPartido.isBefore(moment().startOf("day"))) {
    res.status(400).send({
      message: "La fecha es inválida",
    });
    return;
  }
  if(!(equipos[0].nombre || equipos[1].nombre)) {
    res.status(400).send({
      message: "Los equipos son obligatorios",
    });
    return;
  }
  // Guardado
  const partido = {
    fecha: fechaPartido,
    hora: horaPartido,
    lugar: lugarPartido,
  };

  Equipo.create(equipos[0]).then((data) => {
    partido.equipo1_id = data.dataValues.id;
  });
  Equipo.create(equipos[1])
    .then((data) => {
      partido.equipo2_id = data.dataValues.id;
    })
    .then(() => {
      Partido.create(partido)
        .then((data) => {
          res.send(data);
        })
        .catch(() => {
          res.status(500).send({
            message: "No se pudo crear el partido",
          });
        });
    });
};

exports.editarPartido = (req, res) => {
  // Validaciones
  var fechaPartido = req.body.fecha;
  const horaPartido = req.body.hora;
  const lugarPartido = req.body.lugar;
  const equipos = req.body.equipos;
  if (
    fechaPartido === undefined &&
    horaPartido === undefined &&
    lugarPartido === undefined
  ) {
    res.status(400).send({
      message: "Se debe ingresar al menos un campo para actualizar",
    });
    return;
  }
  if (fechaPartido !== undefined) {
    fechaPartido = moment(req.body.fecha, "YYYY-MM-DD").startOf("day");
    if (fechaPartido.isBefore(moment().startOf("day"))) {
      res.status(400).send({
        message: "La fecha es inválida",
      });
      return;
    }
  }
  // Actualizacion
  const partido = {
    fecha: fechaPartido,
    hora: horaPartido,
    lugar: lugarPartido,
  };

  Partido.update(partido, { where: { id: req.params.id } })
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
};

exports.eliminarTodosLosPartidos = (req, res) => {
  Equipo.destroy({ where: {}, truncate: true });
  Partido.destroy({ where: {}, truncate: true })
    .then(() => {
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