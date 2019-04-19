import React, { Component } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import { WriteProvider } from "../contexts/writeContext";

interface Props {
  router: object;
}

interface State {}

class Write extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <WriteProvider>
        <HeaderContainer type="post" />
        <WriteConatiner />
      </WriteProvider>
    );
  }
}

export default Write;
