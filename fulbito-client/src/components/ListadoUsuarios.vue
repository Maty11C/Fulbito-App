<template>
  <div>
    <b-card header="Usuarios">
      <b-list-group>
        <b-list-group-item v-for="usuario in usuarios" :key="usuario.id">
              {{ usuario.nombre }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "listado-usuarios",
  computed: {
    usuarios() {
      return this.$store.getters.obtenerUsuarios;
    }
  }
};
</script>