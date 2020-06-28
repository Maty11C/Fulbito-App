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
  });

  let usuario = await Usuario.findAll({
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

  console.log(
    "verificacion usuario esta en el otro equipo: ",
    await usuarioEstaEnElOtroEquipo(otroEquipo, usuario)
  );

  if (await usuarioEstaEnElOtroEquipo(otroEquipo, usuario)) {
    res.status(400).send({
      mensaje: "El equipo no puede pertenecer a los dos equipos",
    });
    return;
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

async function usuarioEstaEnElOtroEquipo(equipo, usuarioAInsertar) {
  let otroEquipo = await Equipo.findOne({
    where: { id: equipo.dataValues.id },
    include: [{ model: Usuario, as: "usuarios" }],
  });

  return otroEquipo.dataValues.usuarios.lenght > 0
    ? otroEquipo.dataValues.usuarios.some(
        (usuario) => usuario.dataValues.id === usuarioAInsertar.dataValues.id
      )
    : false;
}

function obtenerOtroEquipo(equipos, idEquipoActual) {
  return equipos.find((equipo) => equipo.id != idEquipoActual);
}
