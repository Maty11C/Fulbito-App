<template>
  <div class="home">
    <crear-partido />
    <listado-partidos v-if="this.$store.getters.obtenerPartidos.length" />
    <b-alert v-else show variant="success" class="mt-3">
      No existen partidos por el momento 
      <b-icon icon="emoji-frown" font-scale="1.8" animation="fade"/>
    </b-alert>
  </div>
</template>

<script>
import CrearPartido from "@/components/CrearPartido";
import ListadoPartidos from "@/components/ListadoPartidos";
import api from "../services/api";

export default {
  name: "Home",
  components: {
    CrearPartido,
    ListadoPartidos
  },
  mounted() {
    api()
      .get("/partidos")
      .then(response => this.$store.commit("setearPartidos", response.data))
      .catch(error => console.log(error.responde.message));
  }
};
</script>
