const moment = require("moment");

const { Partido, Equipo } = require("../database/connection");

exports.obtenerPartidoPorId = (req, res) => {
  Partido.findAll({
    where: { id: req.params.id },
    include: [{ model: Equipo, as: "equipos" }],
  })
    .then((data) => {
      res.send(data[0]);
    })
    .catch(() => {
      res.status(404).send({
        message: "No se encontró el partido",
      });
    });
};

exports.obtenerTodosLosPartidos = (req, res) => {
  Partido.findAll({ include: [{ model: Equipo, as: "equipos" }] })
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
  const equiposPartido = req.body.equipos;
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
  if ((equiposPartido[0].nombre.trim() === "" || equiposPartido[1].nombre.trim() === "")) {
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
    equipos: equiposPartido,
  };

  Partido.create(partido, {
    include: [Equipo],
  })
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
  // Validaciones
  let fecha = req.body.fecha;
  const hora = req.body.hora;
  const lugar = req.body.lugar;
  const equipos = req.body.equipos;
  if (
    fecha === undefined &&
    hora === undefined &&
    lugar === undefined &&
    equipos === undefined
  ) {
    res.status(400).send({
      message: "Se debe ingresar al menos un campo para actualizar",
    });
    return;
  }
  if (equipos && (equipos[0].nombre.trim() === "" || equipos[1].nombre.trim() === "")) {
    res.status(400).send({
      message: "El nombre de ninguno de los equipos puede esta vacio",
    });
    return;
  }
  if (fecha !== undefined) {
    fecha = moment(req.body.fecha, "YYYY-MM-DD").startOf("day");
    if (fecha.isBefore(moment().startOf("day"))) {
      res.status(400).send({
        message: "La fecha es inválida",
      });
      return;
    }
  }
  // Actualizacion
  const partido = {
    fecha,
    hora,
    lugar,
  };

  Partido.findAll({
    where: { id: req.params.id },
    include: [{ model: Equipo, as: "equipos" }],
  }).then((filter) => {
    let equiposAActualizar = equipos ? equipos : filter[0].dataValues.equipos;

    Promise.all([
      filter[0].update(partido),
      filter[0].dataValues.equipos[0].update(equiposAActualizar[0]),
      filter[0].dataValues.equipos[1].update(equiposAActualizar[1]),
    ])
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
  });
};

exports.eliminarTodosLosPartidos = (req, res) => {
  Partido.destroy({ where: {}, truncate: true, include: [Equipo] })
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
