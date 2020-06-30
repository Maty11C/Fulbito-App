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
        api().get('usuarios')
            .then(response => this.$store.commit("setearUsuarios", response.data))
            .catch(error => console.log(error.response.message));
    }
}
</script>