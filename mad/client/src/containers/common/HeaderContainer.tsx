import React, { Component, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";

interface Props {
  type: string;
}

class HeaderContainer extends Component<Props, {}> {
  render() {
    const { type } = this.props;
    return (
      <Fragment>{type === "common" ? <MainHeader /> : <PostHeader />}</Fragment>
    );
  }
}

export default HeaderContainer;
