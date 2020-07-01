import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Equipo from '../views/Equipo.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/equipo/:idPartido",
    name: "Equipo",
    component: Equipo
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
