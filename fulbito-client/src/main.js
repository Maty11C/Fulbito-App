import Vue from "vue";
import store from "./store/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router/index";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store: store,
  render: (h) => h(App),
  router,
  watch: {
    '$route': function() {
      this.show = false;
    }
  }
}).$mount("#app");
