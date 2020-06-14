<template>
  <b-container>
    <b-row cols="3">
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
                {{partido.fecha}}
              </p>
              <p>
                <strong>Hora:</strong>
                {{partido.hora}}
              </p>
              <p>
                <strong>Lugar:</strong>
                {{partido.lugar}}
              </p>
            </b-card-text>

            <b-button href="#" variant="primary">Editar</b-button>
          </b-card>
        </b-col>
      </template>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "listado-partidos",
  data() {
    return {
      partidos: [
        {
          id: 1,
          fecha: "2020-06-31",
          hora: "19:00:00",
          lugar: "Libertadores de América"
        },
        {
          id: 2,
          fecha: "2020-06-31",
          hora: "21:00:00",
          lugar: "Club Esperanza"
        },
        {
          id: 3,
          fecha: "2020-06-31",
          hora: "20:00:00",
          lugar: "La Bombonera"
        },
        {
          id: 4,
          fecha: "2020-06-31",
          hora: "10:00:00",
          lugar: "El Monumental"
        },
        {
          id: 5,
          fecha: "2020-06-31",
          hora: "10:00:00",
          lugar: "Camp Nou"
        },
        {
          id: 6,
          fecha: "2020-07-31",
          hora: "10:00:00",
          lugar: "La Bombonera"
        },
        {
          id: 7,
          fecha: "2020-07-31",
          hora: "10:00:00",
          lugar: "Camp Nou"
        }
      ]
    };
  }
};
</script>