<template>
  <b-container>
    <b-row cols="1" cols-sm="2" cols-lg="3">
      <template v-for="partido in partidos">
        <b-col :key="partido.id">
          <b-card
            title="Partido"
            img-src="https://www.bbva.com/wp-content/uploads/2017/08/bbva-balon-futbol-2017-08-11-1024x622.jpg"
            img-alt="Fulbito"
            img-top
            class="mb-3 mt-3 ml-3 mr-3"
            bg-variant="dark"
            text-variant="white"
          >
            <b-card-text>
              <p>
                <strong>Fecha:</strong>
                {{fechaFormateada(partido.fecha)}}
              </p>
              <p>
                <strong>Hora:</strong>
                {{horaFormateada(partido.hora)}}
              </p>
              <p>
                <strong>Lugar:</strong>
                {{partido.lugar}}
              </p>
            </b-card-text>

            <b-button v-b-modal.modal-editar variant="success" @click="setearIdPartido(partido.id)">Editar</b-button>
          </b-card>
        </b-col>
      </template>
      <editar-partido :idPartido="idPartido" />
    </b-row>
  </b-container>
</template>

<script>
import EditarPartido from "./EditarPartido";
import moment from "moment";

export default {
  name: "listado-partidos",
  data() {
    return {
      idPartido: ""
    }
  },
  components: {
    EditarPartido
  },
  methods: {
    setearIdPartido(id) {
      this.idPartido = id;
    },
    fechaFormateada(fecha) {
      return moment(fecha)
        .locale("es")
        .format("DD MMM YYYY");
    },
    horaFormateada(hora) {
      return moment(hora, "HH:mm:ss")
      .format("HH:mm [hs]")
    }
  },
  computed: {
    partidos() {
      return this.$store.getters.obtenerPartidos;
    }
  }
};
</script>