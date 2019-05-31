import React, { PureComponent, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";
import { PostProvider } from "../contexts/postContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  isLogin: boolean;
  loading: boolean;
}

class Index extends PureComponent<{}, State> {
  static async getInitialProps({ query }) {
    return { keyword: query.keyword };
  }
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
    // console.log("isLogin :", isLogin, "loading :", loading);
    return (
      <Fragment>
        <AuthProvider setIsLogin={this.setIsLogin} setLoading={this.setLoading}>
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
          <PostProvider
            isLogin={isLogin}
            setLoading={this.setLoading}
            keyword={this.props.keyword}
          >
            <PostContainer />
          </PostProvider>
        </AuthProvider>
      </Fragment>
    );
  }
}

export default Index;
