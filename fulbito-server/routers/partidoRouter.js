const router = require("express").Router();

const partidoController = require('../controllers/partidoController');

// Se obtienen todos los partidos
router.get('/', partidoController.obtenerTodosLosPartidos)

// Se obtiene el partido por id
router.get('/:id', partidoController.obtenerPartidoPorId)

// Se crea partido a partir de fecha, hora y lugar
router.post('/', partidoController.crearPartido)

// Se edita un partido con una cierta id
router.put('/:id', partidoController.editarPartido)

module.exports = router;