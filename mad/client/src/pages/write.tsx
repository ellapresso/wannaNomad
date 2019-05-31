import React, { PureComponent } from "react";
import Router from "next/router";
import { WriteProvider } from "../contexts/writeContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import LoadingBar from "../components/common/LoadingBar";

interface Props {
  mode: string;
  pno: number;
}
interface State {
  loading: boolean;
}
class Write extends PureComponent<Props, {}> {
  static async getInitialProps({ query }) {
    return { mode: query.mode, pno: query.pno };
  }
  state: State = {
    loading: false
  };

  componentDidMount() {
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!localStorage.getItem("loginId")) {
      alert("해당페이지의 권한이 없습니다");
      Router.replace("/");
      return false;
    }
  }
  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };
  render() {
    const { mode, pno } = this.props;
    return (
      <WriteProvider mode={mode} pno={pno} setLoading={this.setLoading}>
        {this.state.loading ? <LoadingBar /> : null}
        <HeaderContainer type="post" />
        <WriteConatiner />
      </WriteProvider>
    );
  }
}

export default Write;
