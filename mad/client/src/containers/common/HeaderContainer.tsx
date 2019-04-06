import React, { Component, Fragment } from "react";
import Header from "../../components/common/Header/Header";

interface Props {}

interface State {}

class HeaderContainer extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <Fragment>
        <Header />
      </Fragment>
    );
  }
}

export default HeaderContainer;
