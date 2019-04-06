import React, { Component, createContext } from "react";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: WriteConsumer } = Context;
class WriteProvider extends Component {
  state = {
    value: ""
  };

  actions = {
    setValue: value => {
      this.setState({ value });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { WriteProvider, WriteConsumer };
