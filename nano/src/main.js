import Vue from "vue";
import './plugins/vuetify'
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
