import router from '@/router';

const memberModule = {
    namespaced: true,
    state : {
        userInfo : undefined,
        loginStatus: false,
    },
    getters : {
        getUserInfo(state) {
            return state.userInfo;
        },
        getLoginStatus(state) {
            return state.loginStatus;
        }
    },
    mutations : {
        setLoginStatus(state, loginStatus) {
            state.loginStatus = loginStatus;
        },
    },
    actions : {
        gotoJoin({commit, state, rootState}) {
            router.push({ path: "/join" });
        }
    }
};

export default memberModule;