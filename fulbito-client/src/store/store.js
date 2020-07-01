import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    partidos: [],
    usuarios: [],
    partido: {},
    jugadoresPrimerEquipo: [],
    jugadoresSegundoEquipo: []
  },
  getters: {
    obtenerPartidos: (state) => {
      return state.partidos;
    },
    obtenerUsuarios: (state) => {
      return state.usuarios;
    },
    obtenerPrimerEquipo: (state) => {
      return state.partido.equipos ? state.partido.equipos[0] : [];
    },
    obtenerSegundoEquipo: (state) => {
      return state.partido.equipos ? state.partido.equipos[1] : [];
    },
    obtenerJugadoresPrimerEquipo: (state) => {
      return state.jugadoresPrimerEquipo;
    },
    obtenerJugadoresSegundoEquipo: (state) => {
      return state.jugadoresSegundoEquipo;
    },
    obtenerIdPrimerEquipoDePartido(state,idPartido) {
      let partido = state.partidos.find(partido => partido.id === idPartido);
      console.log(partido);
      return 1;
    },
    obtenerIdSegundoEquipoDePartido(state, idPartido) {
      return state.partidos.find(partido => partido.id === idPartido).equipos[0];
    }
  },
  mutations: {
    setearPartidos(state, partidos) {
      state.partidos = partidos;
    },
    agregarPartido(state, partido) {
      state.partidos.push(partido);
    },
    modificarPartido(state, partido) {
      let index = state.partidos.findIndex((p) => p.id === partido.id);
      state.partidos.splice(index, 1, partido);
    },
    setearUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    setearPartido(state, partido) {
      state.partido = partido
    },
    setearJugadoresEnPrimerEquipo(state, jugadores) {
      console.log("Actualice jugadores primer equipo", jugadores);
      state.jugadoresPrimerEquipo = jugadores;
    },
    setearJugadoresEnSegundoEquipo(state, jugadores) {
      console.log("Actualice jugadores segundo equipo", jugadores);
      state.jugadoresSegundoEquipo = jugadores;
    },
    setearJugadorEnEquipo(state, datos) {
      if(state.partido.equipos[0].id === datos.idEquipo) {
        state.jugadoresPrimerEquipo.push(datos.usuarioAgregado);
      } else {
        state.jugadoresSegundoEquipo.push(datos.usuarioAgregado);
      }
    }
  },
});
