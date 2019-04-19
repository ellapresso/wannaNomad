import React, { Component, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";

interface Props {
  type: string;
  onModal?: any;
}

class HeaderContainer extends Component<Props, {}> {
  render() {
    const { type } = this.props;
    return (
      <Fragment>
        {type === "common" ? (
          <MainHeader onModal={this.props.onModal} />
        ) : (
          <PostHeader />
        )}
      </Fragment>
    );
  }
}

export default HeaderContainer;
