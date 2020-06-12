const moment = require("moment");

const { Partido } = require("../database/connection");

exports.obtenerPartidoPorId = (req, res) => {
    idPartido = req.params.id
    Partido.findAll({ where: { id: idPartido } })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({
                message: 'No se encontró el partido'
            })
        })
}

exports.obtenerTodosLosPartidos = (req, res) => {
    Partido.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({
                message: 'No se pudieron obtener los partidos'
            })
        })
}

exports.crearPartido = (req, res) => {
    const fechaPartido = moment(req.body.fecha, "YYYY-MM-DD")
    const horaPartido = req.body.hora
    const lugarPartido = req.body.lugar
    //Validate
    if (fechaPartido <= moment()) {
        res.status(400).send({
            message: 'La fecha es inválida'
        })
        return
    }
    //Create partido
    const partido = {
        fecha: fechaPartido,
        hora: horaPartido,
        lugar: lugarPartido,        
    }
    //Save partido
    Partido.create(partido)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: 'No se pudo crear el partido'
            })
        })
}

exports.editarPartido = (req, res) => {
    //Editar partido
    Partido.update({ 
        fecha : moment(req.body.fecha, "YYYY-MM-DD"),
        hora : req.body.hora,
        lugar : req.body.lugar,
    }, { where: { id: idPartido } })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: 'No se pudo editar el partido'
        })
    })

}