import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    partidos: [],
  },
  getters: {
    obtenerPartidos: (state) => {
      return state.partidos;
    },
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
  },
});
