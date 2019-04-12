import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let fire_base = require("firebase/app");

require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");

// Initialize Firebase
fire_base.initializeApp({
    apiKey: "AIzaSyDLg1_G2GoA_SYqRndgN_mLKlHLV8R4ZKE",
    authDomain: "nano-community-1.firebaseapp.com",
    databaseURL: "https://nano-community-1.firebaseio.com",
    projectId: "nano-community-1",
    storageBucket: "nano-community-1.appspot.com",
    messagingSenderId: "125871981201"
});

export default new Vuex.Store({
  state: {
      firebase : fire_base,
      drawer : false,
      router : undefined,
      loginStatus : false,
      titles : [
        { title: "홈", icon: "question_answer", goto: "/" },
        { title: "로그인", icon: "dashboard", goto: "/login" }
      ],
      snackbarConfig : {
          snackbar: false,
          y: "top",
          x: null,
          mode: "",
          timeout: 3000,
          text: ""
      },
  },
  getters : {
    getFirebase(state) {
      return state.firebase;
    },
    getDrawer(state) {
      return state.drawer; 
    },
    getRouter(state) {
      return state.router;
    },
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getTitles(state) {
      return state.titles;
    },
    getSnackbarConfig(state) {
      return state.snackbarConfig;
    }
  },
  // 동기적 로직을 정의
  mutations: {
      //  뷰단에서 this.$store.commit('methodName') 형식으로 호출한다.
      setDrawer(state) {
        state.drawer = true;
      },
      setTitle(state, value) {
        state.title = value;
      },
      setRouter(state, $router) {
        state.router = $router;
      },
      setLoginStatus(state, loginStatus) {
        state.loginStatus = loginStatus;
      },
      setSnackbarConfig(state, obj) {
        state.snackbarConfig.snackbar = obj.flag;
        state.snackbarConfig.text = obj.message;
        state.snackbarConfig.timeout = obj.timeout;
      },
  },
  // 비동기적 로직을 정의
  actions: {
      // 뷰단에서 this.$store.dispatch('methodName') 과 같은 방식으로 호출. 
      checkUsersLogin({commit, state}) {
        state.firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            //alert(user);
            state.titles[1].title = '로그아웃';
            state.titles[1].goto = '/logout';
          } else {
            // User is signed out.
            if(state.router.history.current.path !== '/login' && state.router.history.current.path !== '/join') {
              alert('로그인 후 이용해주세요.');
              state.titles[1].title = '로그인';
              state.titles[1].goto = '/login';

              state.router.push({path : '/login'});
            }
          }
        });
      }
  }
});
