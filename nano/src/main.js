import Vue from "vue";
import './plugins/vuetify'
import Vuetify from "vuetify";
import App from "./App.vue";
import { sync } from 'vuex-router-sync'
import store from "./store";
import router from "./router";
import VueCookies from 'vue-cookies'
//import Loading from 'vue-loading-overlay';
//import 'vue-loading-overlay/dist/vue-loading.css';
import '@mdi/font/css/materialdesignicons.min.css';

// store와 router 동기화
sync(store, router);

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueCookies);
//Vue.use(Loading);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
