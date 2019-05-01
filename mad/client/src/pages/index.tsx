import React, { Component, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

class Index extends Component<{}, {}> {
  render() {
    return (
      <AuthProvider>
        <HeaderContainer type="common" />
        <PostContainer />
        <LoginModal />
      </AuthProvider>
    );
  }
}

export default Index;
