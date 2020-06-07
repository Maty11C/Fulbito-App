<template>
  <div>
    <b-button v-b-modal.modal-partido variant="success" size="lg">Crear Partido</b-button>
    <b-modal
      id="modal-partido"
      title="Crear Partido"
      @ok="crear"
      @cancel="cancelar"
      ok-title="Crear"
      cancel-title="Cancelar"
    >
      <b-form>
        <label for="example-datepicker">Fecha</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="partido.fecha"
          class="mb-2"
          placeholder="Seleccioná una fecha"
        ></b-form-datepicker>
        <label for="example-timepicker">Hora</label>
        <b-form-timepicker
          id="example-timepicker"
          v-model="partido.hora"
          placeholder="Seleccioná un horario"
        ></b-form-timepicker>
        <b-form-group id="input-group-1" label="Lugar:" label-for="lugar">
          <b-form-input
            id="lugar"
            v-model="partido.lugar"
            type="text"
            required
            placeholder="Ingresá el lugar donde se jugará"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ partido }}</pre>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "crear-partido",
  data() {
    return {
      partido: {
        fecha: "",
        hora: "",
        lugar: ""
      }
    };
  },
  methods: {
    limpiarCampos() {
      this.partido.fecha = "";
      this.partido.hora = "";
      this.partido.lugar = "";
    },
    crear(bvModalEvt) {
      bvModalEvt.preventDefault();
      api()
        .post("/partidos", JSON.stringify(this.partido))
        .then(response =>{
            this.$bvModal.hide('modal-partido');
            console.log("Se guardó el partido", response.data);
            this.limpiarCampos();
        })
        .catch(error => {
            console.log("Ocurrió un error: ", error);
        });
    },
    cancelar() {
      this.limpiarCampos();
    }
  }
};
</script>