const router = require("express").Router();

const equipoController = require('../controllers/equipoController');

// Se obtienen todos los partidos
router.get('/:id', equipoController.obtenerEquipoPorId);

router.post('/:idEquipo', equipoController.agregarJugadorAEquipo);

router.delete('/:idEquipo/:idUsuario', equipoController.eliminarJugador);

module.exports = router;