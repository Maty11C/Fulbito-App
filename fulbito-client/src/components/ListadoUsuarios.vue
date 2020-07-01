<template>
  <div>
    <b-button variant="success" @click="volverAtras" class="moverIzquierda row">Atras</b-button>
    <div class="row margin-left" align-h="center">
      <b-card header="Usuarios" class="col-md-4">
        <b-form-select v-model="selected" :options="usuarios" :select-size="20"></b-form-select>
      </b-card>
      <div class="col-md-3 mt-5">
        <b-button
          variant="success"
          v-on:click="agregarJugadorAEquipo(primerEquipo.id)"
        >Agregar a {{primerEquipo.nombre}}</b-button>
        <b-button
          class="mt-5"
          variant="danger"
          v-on:click="agregarJugadorAEquipo(segundoEquipo.id)"
        >Agregar a {{segundoEquipo.nombre}}</b-button>
      </div>
      <div class="col-md-4">
        <b-list-group class="col-md-12">
          <b-list-group-item variant="success">{{primerEquipo.nombre}}</b-list-group-item>
          <template v-for="jugador in jugadoresPrimerEquipo">
            <b-list-group-item :key="jugador.value">{{jugador.text}}</b-list-group-item>
          </template>
        </b-list-group>
        <b-list-group class="col-md-12 mt-3">
          <b-list-group-item variant="danger">{{segundoEquipo.nombre}}</b-list-group-item>
          <template v-for="jugador in jugadoresSegundoEquipo">
            <b-list-group-item :key="jugador.value">{{jugador.text}}</b-list-group-item>
          </template>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "listado-usuarios",
  data() {
    return {
      selected: {}
    };
  },
  mounted() {
    api()
      .get(`equipos/${this.primerEquipo.id}`)
      .then(response =>
        this.$store.commit(
          "setearJugadoresEnPrimerEquipo",
          this.armarEquipos(response.data.usuarios)
        )
      )
      .catch(error => console.log(error));

    api()
      .get(`equipos/${this.segundoEquipo.id}`)
      .then(response =>
        this.$store.commit(
          "setearJugadoresEnSegundoEquipo",
          this.armarEquipos(response.data.usuarios)
        )
      )
      .catch(error => console.log(error));
  },
  computed: {
    usuarios() {
      let usuariosSelect = this.armarEquipos(
        this.$store.getters.obtenerUsuarios
      );
      return usuariosSelect;
    },
    primerEquipo() {
      return this.$store.getters.obtenerPrimerEquipo;
    },
    segundoEquipo() {
      return this.$store.getters.obtenerSegundoEquipo;
    },
    jugadoresPrimerEquipo() {
      return this.$store.getters.obtenerJugadoresPrimerEquipo;
    },
    jugadoresSegundoEquipo() {
      return this.$store.getters.obtenerJugadoresSegundoEquipo;
    }
  },
  methods: {
    agregarJugadorAEquipo(idEquipo) {
      let idUsuario = this.selected;
      api()
        .post(`equipos/${idEquipo}`, { idUsuario })
        .then(() => {
          this.$bvToast.toast("El jugador se agregó al equipo con éxito", {
            title: "Info",
            variant: "success",
            solid: true
          });
          // Acá deberiamos modificar el listado de usuario que tendria que ser una copia
          let usuarioAgregado = this.usuarios.find(
            usuario => usuario.value === idUsuario
          );
          let datos = { usuarioAgregado, idEquipo };
          this.$store.commit("setearJugadorEnEquipo", datos);
        })
        .catch(error => {
          this.$bvToast.toast(`${error.response.data.message}`, {
            title: "Error",
            variant: "danger",
            solid: true
          });
        });
    },
    armarEquipos(listaJugadores) {
      let listaProcesada = [];
      listaJugadores.forEach(usuario =>
        listaProcesada.push({ value: usuario.id, text: usuario.nombre })
      );
      return listaProcesada;
    },
    volverAtras() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.margin-left {
  margin-left: 100px;
}
.moverIzquierda {
  float: left;
}
</style>