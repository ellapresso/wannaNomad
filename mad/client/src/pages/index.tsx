import React, { Component, Fragment } from "react";
import axios from "axios";
import { KAKAO_API_KEY } from "../key/API_KEY";
// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

interface State {
  isOpen: boolean;
}

class Index extends Component<{}, State> {
  state: State = {
    isOpen: false
  };

  componentDidMount() {
    window.Kakao.init(KAKAO_API_KEY);
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: authObj => {
        // console.log(JSON.stringify(authObj.access_token));
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(res => console.log("KakaoLogin", res))
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });
  }

  _onModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <HeaderContainer type="common" onModal={this._onModal} />
        <PostContainer />
        <LoginModal isOpen={isOpen} onModal={this._onModal} />
      </Fragment>
    );
  }
}

export default Index;
