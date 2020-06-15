<template>
  <b-modal
    id="modal-editar"
    title="Editar Partido"
    @show="buscarPartido"
    @ok="editar"
    @hidden="limpiarCampos"
    ok-title="Editar"
    cancel-title="Cancelar"
    header-bg-variant="dark"
    header-text-variant="light"
    ok-variant="success"
  >
    <b-form>
      <label for="fecha-partido">Fecha</label>
      <b-form-datepicker
        id="fecha-partido"
        v-model="partido.fecha"
        class="mb-2"
        placeholder="Seleccioná una fecha"
        :min="setearFechaInicial()"
        :required="true"
        :state="esFechaValida"
        @input="validarFecha()"
        label-no-date-selected="Fecha no seleccionada"
        label-next-year="Año siguiente"
        label-next-month="Mes siguiente"
        label-current-month="Mes actual"
        label-prev-month="Mes anterior"
        label-prev-year="Año anterior"
        label-help="Use las teclas del cursor para navegar por las fechas del calendario"
      ></b-form-datepicker>
      <label for="hora-partido">Hora</label>
      <b-form-timepicker
        id="hora-partido"
        v-model="partido.hora"
        placeholder="Seleccioná un horario"
        :required="true"
        :state="esHoraValida"
        @input="validarHora()"
        label-no-time-selected="Hora no seleccionada"
        label-close-button="Cerrar"
        label-hours="Horas"
        label-minutes="Minutos"
        :disabled="partido.fecha == ''"
      ></b-form-timepicker>
      <b-form-invalid-feedback id="hora-partido">Ingresá una hora válida</b-form-invalid-feedback>
      <b-form-group id="input-group-1" label="Lugar:" label-for="lugar">
        <b-form-input
          id="lugar"
          v-model="partido.lugar"
          type="text"
          required
          placeholder="Ingresá el lugar donde se jugará"
          :state="esLugarValido"
          @input="validarLugar()"
        ></b-form-input>
        <b-form-invalid-feedback id="lugar">Ingresá un lugar válido</b-form-invalid-feedback>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import api from "../services/api";
import moment from "moment";

export default {
  name: "editar-partido",
  data() {
    return {
      partido: {
        fecha: "",
        hora: "",
        lugar: ""
      },
      esFechaValida: null,
      esHoraValida: null,
      esLugarValido: null
    };
  },
  props: ["idPartido"],
  methods: {
    limpiarCampos() {
      this.partido.fecha = "";
      this.partido.hora = "";
      this.partido.lugar = "";
      this.esFechaValida = null;
      this.esHoraValida = null;
      this.esLugarValido = null;
    },
    editar(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.datosValidos()) {
        api()
          .put(`/partidos/${this.idPartido}`, JSON.stringify(this.partido))
          .then(() => {
            let partido = {};
            partido.id = this.idPartido;
            partido.fecha = this.partido.fecha;
            partido.hora = this.partido.hora;
            partido.lugar = this.partido.lugar;
            this.$store.commit("modificarPartido", partido);
            this.$bvModal.hide("modal-editar");
            this.$bvToast.toast("El partido se editó con éxito", {
              title: "Info",
              variant: "success",
              solid: true
            });
          })
          .catch(error => {
            this.$bvToast.toast(`${error.response.data.message}`, {
              title: "Error",
              variant: "danger",
              solid: true
            });
          });
      }
    },
    setearFechaInicial() {
      return moment().format("YYYY-MM-DD");
    },
    datosValidos() {
      this.validarFecha();
      this.validarHora();
      this.validarLugar();
      return this.esFechaValida && this.esHoraValida && this.esLugarValido;
    },
    validarFecha() {
      this.esFechaValida = this.partido.fecha != "";
    },
    validarHora() {
      if (
        moment(this.partido.fecha, "YYYY-MM-DD").isSame(
          moment().format("YYYY-MM-DD")
        )
      ) {
        this.esHoraValida = moment(this.partido.hora, "HH:mm:ss").isAfter(
          moment(moment().format("HH:mm:ss"), "HH:mm:ss")
        );
      } else {
        this.esHoraValida = this.partido.hora != "";
      }
    },
    validarLugar() {
      this.esLugarValido = this.partido.lugar != "";
    },
    buscarPartido() {
      let partido = this.$store.getters.obtenerPartidos.find(
        partido => partido.id === this.idPartido
      );
      this.partido.fecha = partido.fecha;
      this.partido.hora = partido.hora;
      this.partido.lugar = partido.lugar;
    }
  }
};
</script>