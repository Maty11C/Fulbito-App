<template>
  <b-list-group class="col-md-12">
    <b-list-group-item :variant="this.variant">{{equipo.nombre}}</b-list-group-item>
    <template v-for="jugador in jugadoresEquipo">
      <b-list-group-item :key="jugador.value">{{jugador.text}}</b-list-group-item>
    </template>
  </b-list-group>
</template>

<script>
import api from "../services/api";

export default {
  name: "listado-equipo",
  props: ["equipo", "esPrimerEquipo", "variant"],
  updated() {
    api()
      .get(`equipos/${this.equipo.id}`)
      .then(response => {
        if (this.esPrimerEquipo) {
          this.$store.commit(
            "setearJugadoresEnPrimerEquipo",
            this.armarEquipos(response.data.usuarios)
          );
        } else {
          this.$store.commit(
            "setearJugadoresEnSegundoEquipo",
            this.armarEquipos(response.data.usuarios)
          );
        }
      })
      .catch(error => console.log(error));
  },
  computed: {
    jugadoresEquipo() {
      if (this.esPrimerEquipo) {
        return this.$store.getters.obtenerJugadoresPrimerEquipo;
      } else {
        return this.$store.getters.obtenerJugadoresSegundoEquipo;
      }
    }
  },
  methods: {
    armarEquipos(listaJugadores) {
      let listaProcesada = [];
      listaJugadores.forEach(usuario =>
        listaProcesada.push({ value: usuario.id, text: usuario.nombre })
      );
      return listaProcesada;
    }
  }
};
</script>