import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Join from "./views/Join.vue";
import firebase from './firebase';

Vue.use(Router);

function getCurrentUser() {
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
    const uiState = store.state.ui;
    const memberState = uiState.member;
    
    const curUser = await getCurrentUser();
  
    if (curUser) {
      uiState.titles[1].title = "로그아웃";
      uiState.titles[1].goto = "/logout";

      memberState.loginStatus = true;
      memberState.userInfo = curUser;

      next();
    } else {
        if (to.path !== "/login" && to.path !== "/join") {
            alert("로그인 후 이용해주세요.");
            uiState.titles[1].title = "로그인";
            uiState.titles[1].goto = "/login";
            memberState.loginStatus = false;
            memberState.userInfo = undefined;

            next({path: '/login'});
        }
    }
};

const doLogout = function(to, from, next) {
    const uiState = store.state.ui; 
    const memberState = uiState.member;

    firebase.auth().signOut().then((res) => {
      alert('로그아웃에 성공하였습니다.');
      uiState.titles[1].title = "로그인";
      uiState.titles[1].goto = "/login";

      memberState.loginStatus = false;
      memberState.userInfo = undefined;
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
