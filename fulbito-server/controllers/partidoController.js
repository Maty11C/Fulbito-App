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
  // Guardado
  const partido = {
    fecha: fechaPartido,
    hora: horaPartido,
    lugar: lugarPartido,
  };

  const equipo1 = {
    nombre: equipos[0].nombre,
  };

  const equipo2 = {
    nombre: equipos[1].nombre,
  };
  Partido.create(partido)
    .then((data) => {
      let partidoId = data.id;
      equipo1.partidoId = partidoId;
      equipo2.partidoId = partidoId;
      Equipo.create(equipo1);
      Equipo.create(equipo2);
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
