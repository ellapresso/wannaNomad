import React, { Component, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";
import { PostProvider } from "../contexts/postContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  postDatas: Array<object>;
  loading: boolean;
}

class Index extends Component<{}, State> {
  state: State = {
    postDatas: [],
    loading: false
  };

  setPostDatas = postDatas => {
    this.setState({ postDatas });
  };

  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { loading, postDatas } = this.state;
    return (
      <Fragment>
        <AuthProvider
          setPostDatas={this.setPostDatas}
          setLoading={this.setLoading}
        >
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
          <PostProvider postDatas={postDatas} setLoading={this.setLoading}>
            <PostContainer />
          </PostProvider>
        </AuthProvider>
      </Fragment>
    );
  }
}

export default Index;
