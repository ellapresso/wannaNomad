import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Join from "./views/Join.vue";
import firebase from './firebase';

Vue.use(Router);

function getCurrentUser() {
    const state = store.state;

    let userLoaded = false;
    return new Promise((resolve, reject) => {
      if (userLoaded) {
            resolve(firebase.auth().currentUser);
      }
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          userLoaded = true;
          unsubscribe();
          resolve(user);
      }, reject);
    });
}

const preventAccessWithoutLogin = async function(to, from, next) {
    const state = store.state;
    const curUser = await getCurrentUser();
  
    if (curUser) {
      state.titles[1].title = "로그아웃";
      state.titles[1].goto = "/logout";

      state.loginStatus = true;
      next();
    } else {
        if (to.path !== "/login" && to.path !== "/join") {
            alert("로그인 후 이용해주세요.");
            state.titles[1].title = "로그인";
            state.titles[1].goto = "/login";
            state.loginStatus = false;

            next({path: '/login'});
        }
    }
};

const doLogout = function(to, from, next) {
    const state = store.state;  
    firebase.auth().signOut().then((res) => {
      alert('로그아웃에 성공하였습니다.');
      state.titles[1].title = "로그인";
      state.titles[1].goto = "/login";

      state.loginStatus = false;
      next('/login');
    }).catch(function(error) {
      console.log(error);
      alert('로그아웃에 실패하였습니다.');
    });
};

export default new Router({
  mode : 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter : preventAccessWithoutLogin
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter : doLogout,
    },
    {
      path: "/join",
      name: "join",
      component: Join
    }
  ]
});
