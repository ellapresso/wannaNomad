import React, { Component } from "react";

interface Props {
  from: string;
  url: object;
}

interface State {
  counter: number;
}

class SSRTest extends Component<Props, State> {
  state: State = {
    counter: 0
  };

  onIncrement = (): void => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  static async getInitialProps({ req }) {
    // etInitialProps 에서 실행한 메소드에서 리턴하는 값이 해당 컴포넌트의  props 로 전달
    return req
      ? {
          from: "server"
        } // 서버에서 실행 할 시
      : {
          from: "client "
        }; // 클라이언트에서 실행 할 시
  }

  render() {
    console.log(this.props);
    return <div>{this.props.from} 에서 실행이 되었어요.</div>;
  }
}

export default SSRTest;
