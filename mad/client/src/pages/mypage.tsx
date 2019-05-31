import React, { Component, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";
import { MypageProvider } from "../contexts/mypageContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class mypage extends Component<{}, State> {
  state: State = {
    isLogin: false,
    loading: false
  };

  setIsLogin = (isLogin: boolean = false) => {
    this.setState({ isLogin });
  };

  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { isLogin, loading } = this.state;
    return (
      <Fragment>
        <AuthProvider setIsLogin={this.setIsLogin} setLoading={this.setLoading}>
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
          <MypageProvider isLogin={isLogin} setLoading={this.setLoading}>
            <MypageContainer />
          </MypageProvider>
        </AuthProvider>
      </Fragment>
    );
  }
}

export default mypage;
