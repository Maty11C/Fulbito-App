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