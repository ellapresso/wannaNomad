import React, { Component, Fragment } from "react";
import MainHeader from "../../components/common/Header";
import { PostHeader } from "../../components/common/Header";

interface Props {
  type: string;
}

interface State {}

class HeaderContainer extends Component<Props, State> {
  state: State = {};

  render() {
    const { type } = this.props;
    return (
      <Fragment>{type === "common" ? <MainHeader /> : <PostHeader />}</Fragment>
    );
  }
}

export default HeaderContainer;
