const router = require("express").Router();

const equipoController = require('../controllers/equipoController');

// Se obtienen todos los partidos
router.get('/:id', equipoController.obtenerEquipoPorId);

router.post('/:idEquipo', equipoController.agregarJugadorAEquipo);

module.exports = router;