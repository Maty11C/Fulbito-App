<template>
    <div>
        <listado-usuarios />
    </div>
</template>

<script>
import api from '../services/api';
import ListadoUsuarios from '@/components/ListadoUsuarios';

export default {
    name: "Partido",
    components: {
        ListadoUsuarios
    },
    mounted() {
        //Se obtiene el partido actual
        api().get(`partidos/${this.$route.params.idPartido}`)
            .then(response => this.$store.commit("setearPartido", response.data))
            .catch(error => console.log(error.response.message));

        //Se obtienen los usuarios
        api().get('usuarios')
            .then(response => this.$store.commit("setearUsuarios", response.data))
            .catch(error => console.log(error.response.message));
    }
}
</script>