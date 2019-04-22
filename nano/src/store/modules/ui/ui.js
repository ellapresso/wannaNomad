import memberModule from '../member/member';

const uiModule = {
    namespaced : true,
    state: {
        drawer: false,
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
        getsnackbarConfig(state) {
            return state.snackbarConfig;
        }
    },
    // 동기적 로직을 정의
    mutations: {
        //  뷰단에서 this.$store.commit('methodName') 형식으로 호출한다.
        setDrawer(state, value) {
            state.drawer = value;
        },
        setTitle(state, value) {
            state.title = value;
        },
        setSnackbarConfig(state, snackbarObj) {
            state.snackbarConfig.snackbar = snackbarObj.flag;
            state.snackbarConfig.text = snackbarObj.message;
            state.snackbarConfig.timeout = snackbarObj.timeout;
        },
    },
    // 비동기적 로직을 정의
    actions: {
        setDrawer({commit, state, rootState}, value) {
            commit('setDrawer', value);
        },
    },
    modules : {
        member : memberModule
    }
}

export default uiModule;