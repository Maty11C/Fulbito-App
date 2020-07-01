<template>
    <div>
        <listado-usuarios />
    </div>
</template>

<script>
import api from '../services/api';
import ListadoUsuarios from '@/components/ListadoUsuarios';

export default {
    name: "Equipo",
    components: {
        ListadoUsuarios
    },
    mounted: async function() {
        //Se obtiene el partido actual
        await api().get(`partidos/${this.$route.params.idPartido}`)
            .then(response => this.$store.commit("setearPartido", response.data))
            .catch(error => console.log(error.response.message));

        //Se obtienen los usuarios
        await api().get('usuarios')
            .then(response => this.$store.commit("setearUsuarios", response.data))
            .catch(error => console.log(error.response.message));
    },
    methods: {
        actualizarListadoJugadores() {
            this.$ref.listado.actualizarListadoJugadores;
        }
    }
}
</script>