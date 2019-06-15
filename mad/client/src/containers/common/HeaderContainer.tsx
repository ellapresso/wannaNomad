import React, { PureComponent, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";
import { AuthConsumer } from "../../contexts/authContext";
import { WriteConsumer } from "../../contexts/writeContext";
import Menu from "../../components/common/Menu";

interface Props {
  type: string;
}

class HeaderContainer extends PureComponent<Props, {}> {
  render() {
    const { type } = this.props;
    return type === "common" ? (
      <AuthConsumer>
        {({ state, actions }: any) => (
          <Fragment>
            <MainHeader state={state} actions={actions} />
            <Menu state={state} actions={actions} />
          </Fragment>
        )}
      </AuthConsumer>
    ) : (
      <WriteConsumer>
        {({ state, actions }: any) => (
          <PostHeader state={state} actions={actions} />
        )}
      </WriteConsumer>
    );
  }
}

export default HeaderContainer;
