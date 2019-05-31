/**
 * 권한 관련 context
 */
import React, { PureComponent, createContext } from "react";
import { KAKAO_API_KEY } from "../key/API_KEY";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: AuthConsumer } = Context;

/**
 * setLoading : 로딩 처리 이벤트
 * isModal: 모달 open 여부
 * isLogin: 로그인 여부
 * loading: 로딩 display 여부
 * onModal: 모달 이벤트
 * onLogin: 로그인 이벤트
 * onLogout: 로그아웃 이벤트
 */

interface Props {
  setPostDatas?: () => void;
  setIsLogin: (type: boolean) => void;
  setLoading: () => void;
}
interface State {
  isModal: boolean;
  isLogin: boolean;
  isMenu: boolean;
  userName: string;
  userImg: string;
}

declare var Kakao: any;

class AuthProvider extends PureComponent<Props, State> {
  state: State = {
    isModal: false,
    isLogin: false,
    isMenu: false,
    userName: "",
    userImg: ""
  };

  actions = {
    onModal: () => {
      this.setState({
        isModal: !this.state.isModal
      });
    },
    onLogin: () => {
      this.login();
    },
    onLogOut: async () => {
      this.props.setLoading();
      await Kakao.Auth.logout();
      await this.getLoginStatus();
      this.props.setLoading();
    },
    onMenu: () => {
      this.setState({
        isMenu: !this.state.isMenu
      });
    }
  };

  componentDidMount() {
    //Kakao SDK에서 사용한 리소스를 해제합니다.
    Kakao.cleanup();
    //Kakao SDK를 초기화합니다.
    Kakao.init(KAKAO_API_KEY);
    //현재 로그인 상태 체크
    this.getLoginStatus();
  }

  /**
   * kakao 로그인
   */
  login = () => {
    this.props.setLoading();
    Kakao.Auth.login({
      success: (authObj: object) => {
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(async res => {
            await this.getLoginStatus();
            await this.setState({ isModal: false });
            this.props.setLoading();
          })
          .catch((err: object) => console.log(err));
      },
      fail: (err: object) => {
        console.log(err);
      }
    });
  };
  /**
   * 로그인 토큰 연결 여부 확인
   */
  getLoginStatus = () => {
    console.log("getLoginStatus");
    Kakao.Auth.getStatus((authStatus: object) => {
      console.log("1.getLoginStatus", authStatus);
      if (authStatus.status === "connected") {
        // 고객 데이터 localStorage 저장
        localStorage.setItem("loginId", authStatus.user.id);
        this.setState({
          isLogin: true,
          userName: authStatus.user.properties.nickname,
          userImg: authStatus.user.properties.profile_image
        });
        this.props.setIsLogin(true);
      } else {
        // localStorage 삭제
        localStorage.clear();
        this.setState({
          isLogin: false,
          userName: "",
          userImg: ""
        });
        this.props.setIsLogin(false);
      }
    });
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, AuthConsumer };
