<template>
  <div>
    <b-card header="Usuarios" class="col-md-6">
      <table class="table col-md-3">
        <tr v-for="usuario in usuarios" v-bind:key="usuario.id" v-bind:title="usuario.nombre">
          <td class="text-left">{{usuario.nombre}}</td>
          <td class="text-right">
            <b-button v-on:click="agregarJugadorAEquipo(usuario.id, primerEquipo.id)">
              Agregar a {{primerEquipo.nombre}}
            </b-button>
            <b-button v-on:click="agregarJugadorAEquipo(usuario.id, segundoEquipo.id)">
              Agregar a {{segundoEquipo.nombre}}
            </b-button>
          </td>
        </tr>
      </table>
    </b-card>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "listado-usuarios",
  computed: {
    usuarios() {
      return this.$store.getters.obtenerUsuarios;
    },
    primerEquipo() {
      return this.$store.getters.obtenerPrimerEquipo;
    },
    segundoEquipo() {
      return this.$store.getters.obtenerSegundoEquipo;
    }
  },
  methods: {
    agregarJugadorAEquipo(idUsuario, idEquipo) {
      api().post(`equipos/${idEquipo}`, { idUsuario })
        .then(() => {
          this.$bvToast.toast("El jugador se agregó al equipo con éxito", {
              title: "Info",
              variant: "success",
              solid: true
          });
        })
        .catch((error) => {
          this.$bvToast.toast(`${error.response.data.message}`, {
              title: "Error",
              variant: "danger",
              solid: true
          });
        });
    }
  }
};
</script>