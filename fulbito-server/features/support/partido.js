const { setWorldConstructor } = require("cucumber");

class Partido {
    constructor() {
        this.fecha = null;
        this.hora = null;
        this.ubicacion = null;
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

    getUbicacion() {
        return this.ubicacion;
    }

    setUbicacion(ubicacion) {
        this.ubicacion = ubicacion;
    }
}

setWorldConstructor(Partido);