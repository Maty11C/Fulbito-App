const { Equipo } = require("../database/connection");

exports.obtenerEquipoPorId = (req, res) => {
    Equipo.findAll({ where: { id: req.params.id } })
      .then((data) => {
        res.send(data[0]);
      })
      .catch(() => {
        res.status(404).send({
          message: "No se encontró el equipo",
        });
      });
  };

exports.agregarJugadorAEquipo = (req, res) => {
  console.log(req)
  let equipo = {
    id: req.params.idEquipo,
    jugadores: [
      {
        id: req.body.idUsuario
      }
    ]
  }
  Equipo.create(equipo, {
    include: [{
      model: Usuario, 
      as: 'jugadores'
    }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "No se pudo agregar el jugador al equipo",
      });
    });
  // Equipo.findAll({
  //   where: { id: req.params.idEquipo },
  //   include: [{ model: Usuario, as: "jugadores" }],
  // }).then((filter) => {
  //   let equiposAActualizar = equipos ? equipos : filter[0].dataValues.equipos;

  //   Promise.all([
  //     filter[0].update(partido),
  //     filter[0].dataValues.equipos[0].update(equiposAActualizar[0]),
  //     filter[0].dataValues.equipos[1].update(equiposAActualizar[1]),
  //   ])
  //     .then(() => {
  //       res.send({
  //         message: "El partido se actualizó exitosamente",
  //       });
  //     })
  //     .catch(() => {
  //       res.status(500).send({
  //         message: "No se pudo editar el partido",
  //       });
  //     });
  // });
}