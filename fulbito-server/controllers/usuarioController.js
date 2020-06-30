const { Usuario } = require("../database/connection");

exports.obtenerTodosLosUsuarios = (req, res) => {
  Usuario.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({
        message: "No se pudieron obtener los usuarios",
      });
    });
};