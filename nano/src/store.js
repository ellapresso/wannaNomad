import Vue from "vue";
import Vuex from "vuex";
import router from '@/router';
import VueCookies from 'vue-cookies';
import firebase from './firebase';

Vue.use(Vuex);
Vue.use(VueCookies);

let store = new Vuex.Store({
    state: {
        drawer: false,
        userInfo : undefined,
        loginStatus: false,
        titles: [
            { title: "홈", icon: "question_answer", goto: "/" },
            { title: "로그인", icon: "dashboard", goto: "/login" }
        ],
        snackbarConfig: {
            snackbar: false,
            y: "top",
            x: null,
            mode: "",
            timeout: 3000,
            text: ""
        },
        loader : undefined,
    },
    getters: {
        getDrawer(state) {
            return state.drawer;
        },
        getTitles(state) {
            return state.titles;
        },
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
        setLoginStatus(state, loginStatus) {
            state.loginStatus = loginStatus;
        },
        setSnackbarConfig(state, snackbarObj) {
            state.snackbarConfig.snackbar = snackbarObj.flag;
            state.snackbarConfig.text = snackbarObj.message;
            state.snackbarConfig.timeout = snackbarObj.timeout;
        },
    },
    // 비동기적 로직을 정의
    actions: {
        // 뷰단에서 this.$store.dispatch('methodName') 과 같은 방식으로 호출.
        firebaseEmailLogin({commit, state}, loginObj) {
            if (!loginObj.emailErrors.length && !loginObj.passwordErrors.length) {
                commit('setSnackbarConfig', {flag : true, message : '로그인을 시도 중입니다.', timeout : 2000,});
                // 파이어베이스 이메일로그인
                firebase
                .auth()
                .signInWithEmailAndPassword(loginObj.email, loginObj.password)
                .then(res => {
                    alert("로그인을 환영합니다.");

                    // 로그인 아이디 저장
                    if (loginObj.checkbox) {
                        $cookies.set("loginSaveEmail", loginObj.email);
                    } else {
                        $cookies.set("loginSaveEmail", "");
                    }

                    commit("setLoginStatus", true);
                    router.push({ path: "/" });
                })
                .catch(function(error) {
                    console.log(error);
                    alert("로그인에 실패하였습니다. 다시 시도해주세요.");
                });
            }
        },
        gotoJoin({commit, state}) {
            router.push({ path: "/join" });
        }
    }
});

export default store;