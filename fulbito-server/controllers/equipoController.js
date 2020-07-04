const { Equipo, Usuario, Partido } = require("../database/connection");

function obtenerOtroEquipo(equipos, idEquipoActual) {
  return equipos.find((equipo) => equipo.id != idEquipoActual);
}

function usuarioPerteneceAlEquipo(equipo, usuario) {
  usuariosDeEquipo = equipo.dataValues.usuarios
  return usuariosDeEquipo.length > 0 ? usuariosDeEquipo.some((x) => x.dataValues.id === usuario.dataValues.id) : false
}

exports.obtenerEquipoPorId = (req, res) => {
  Equipo.findAll({
    where: { id: req.params.id },
    include: [{ model: Usuario, as: "usuarios" }],
  })
    .then((data) => {
      res.send(data[0]);
    })
    .catch(() => {
      res.status(404).send({
        message: "No se encontró el equipo",
      });
    });
};

exports.agregarJugadorAEquipo = async (req, res) => {
  let equipo = await Equipo.findOne({
    where: { id: req.params.idEquipo },
    include: [{ model: Usuario, as: "usuarios" }],
  });

  let usuario = await Usuario.findOne({
    where: { id: req.body.idUsuario },
  });

  let partido = await Partido.findAll({
    where: { id: equipo.dataValues.partidoId },
    include: [{ model: Equipo, as: "equipos" }],
  });

  const idOtroEquipo = obtenerOtroEquipo(partido[0].dataValues.equipos, req.params.idEquipo).id
  let otroEquipo = await Equipo.findOne({
    where: { id: idOtroEquipo },
    include: [{ model: Usuario, as: "usuarios" }],
  });

  if (equipo.dataValues.usuarios.length === 5) {
    res.status(400).send({
      message: "El equipo ya esta completo",
    });
  } else if (usuarioPerteneceAlEquipo(equipo, usuario)) {
    res.status(400).send({
      message: "El usuario ya se encuentra en el equipo",
    });
  } else if (usuarioPerteneceAlEquipo(otroEquipo, usuario)) {
    res.status(400).send({
      message: "El usuario no puede pertenecer a los dos equipos",
    });
  } else {
    equipo
      .addUsuario(usuario)
      .then(() => {
        res.send({ message: "El usuario se agregó exitosamente al equipo" });
      })
      .catch(() => {
        res.send({ message: "No se pudo agregar el usuario al equipo" });
      });
  }
};

exports.eliminarJugador = async (req, res) => {
  let equipo = await Equipo.findOne({
    where: { id: req.params.idEquipo },
    include: [{ model: Usuario, as: "usuarios" }],
  });

  let usuario = await Usuario.findOne({
    where: { id: req.params.idUsuario },
  });

  if (!usuarioPerteneceAlEquipo(equipo, usuario)) {
    res.status(400).send({
      message: "El jugador no pertenece al equipo",
    });
    return
  }

  equipo.removeUsuario(usuario)
    .then(() => res.send("Se eliminó al usuario del equipo exitosamente"))
    .catch(() => res.send("Falló la eliminación"));
};