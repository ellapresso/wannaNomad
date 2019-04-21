import router from '@/router';
import firebase from '@/firebase';

const memberModule = {
    namespaced: true,
    state : {
        userInfo : undefined,
        loginStatus: false,
    },
    getters : {

    },
    mutations : {
        setLoginStatus(state, loginStatus) {
            state.loginStatus = loginStatus;
        },
    },
    actions : {
        // 뷰단에서 this.$store.dispatch('methodName') 과 같은 방식으로 호출.
        firebaseEmailLogin({commit, state, rootState}, loginObj) {

            if (!loginObj.emailErrors.length && !loginObj.passwordErrors.length) {
                commit('ui/setSnackbarConfig', {flag : true, message : '로그인을 시도 중입니다.', timeout : 2000,}, {root : true});
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
        gotoJoin({commit, state, rootState}) {
            router.push({ path: "/join" });
        }
    }
};

export default memberModule;