const { Equipo, Usuario } = require("../database/connection");

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

  equipo
    .addUsuario(usuario)
    .then(() => {
      res.send({ mensaje: "El usuario se agregó exitosamente al equipo" });
    })
    .catch(() => {
      res.send({ mensaje: "No se pudo agregar el usuario al equipo" });
    });
};
