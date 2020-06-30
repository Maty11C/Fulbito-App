const router = require("express").Router();

const usuarioController = require('../controllers/usuarioController');

// Se obtienen todos los usuarios
router.get('/', usuarioController.obtenerTodosLosUsuarios);

module.exports = router;