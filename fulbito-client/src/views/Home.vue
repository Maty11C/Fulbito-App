<template>
  <div class="home">
    <crear-partido/>
    <listado-partidos/>
  </div>
</template>

<script>
import CrearPartido from '@/components/CrearPartido'
import ListadoPartidos from '@/components/ListadoPartidos'

export default {
  name: 'Home',
  components: {
    CrearPartido,
    ListadoPartidos
  }
}
</script>
