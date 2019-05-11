import React, { Component } from "react";
import { WriteProvider } from "../contexts/writeContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import LoadingBar from "../components/common/LoadingBar";

interface Props {
  mode: string;
  pno: string;
}
interface State {
  loading: boolean;
}
class Write extends Component<Props, {}> {
  static async getInitialProps({ query }) {
    return { mode: query.mode, pno: query.pno };
  }

  state: State = {
    loading: false
  };

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
