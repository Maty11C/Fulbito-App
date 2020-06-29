const { Equipo, Usuario, Partido } = require("../database/connection");

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
    include: [{model: Usuario, as: "usuarios"}]
  });

  let usuario = await Usuario.findOne({
    where: { id: req.body.idUsuario },
  });

  let partido = await Partido.findAll({
    where: { id: equipo.dataValues.partidoId },
    include: [{ model: Equipo, as: "equipos" }],
  });

  let otroEquipo = obtenerOtroEquipo(
    partido[0].dataValues.equipos,
    req.params.idEquipo
  );
  console.log("Cantidad Equipos", equipo.dataValues.usuarios);

  if (equipo.dataValues.usuarios.length === 5) {
    res.status(400).send({
      message: "El equipo ya esta completo",
    });
  } else if (await usuarioEstaEnElEquipo(equipo, usuario)) {
    res.status(400).send({
      message: "El usuario ya se encuentra en el equipo",
    });
  } else if (await usuarioEstaEnElEquipo(otroEquipo, usuario)) {
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

async function usuarioEstaEnElEquipo(equipo, usuarioAInsertar) {
  let otroEquipo = await Equipo.findOne({
    where: { id: equipo.dataValues.id },
    include: [{ model: Usuario, as: "usuarios" }],
  });

  return otroEquipo.dataValues.usuarios.length > 0
    ? otroEquipo.dataValues.usuarios.some((usuario) => {
        return usuario.dataValues.id === usuarioAInsertar.dataValues.id;
      })
    : false;
}

function obtenerOtroEquipo(equipos, idEquipoActual) {
  return equipos.find((equipo) => equipo.id != idEquipoActual);
}
