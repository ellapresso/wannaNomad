import Vue from "vue";
import Vuex from "vuex";
import VueCookies from 'vue-cookies';

import uiModule from './store/modules/ui/ui';

Vue.use(Vuex);
Vue.use(VueCookies);

const store = new Vuex.Store({
    modules : {
        ui : uiModule,
    }
});

export default store;