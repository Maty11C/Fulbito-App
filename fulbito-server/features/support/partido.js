const { setWorldConstructor } = require("cucumber");

class Partido {
    constructor() {
        this.fecha = null;
        this.hora = null;
        this.lugar = null;
      }
    getFecha() {
        return this.fecha;
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

    getHora() {
        return this.hora;
    }

    setHora(hora) {
        this.hora = hora;
    }

    getLugar() {
        return this.lugar;
    }

    setLugar(lugar) {
        this.lugar = lugar;
    }
}

setWorldConstructor(Partido);