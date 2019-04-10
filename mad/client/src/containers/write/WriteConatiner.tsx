import React, { Component } from "react";
import Write from "../../components/write";
import CodeView from "../../components/common/CodeView";

interface Props {}
interface State {
  markdown: string;
}
class WriteConatiner extends Component<Props, State> {
  state: State = {
    markdown: "# 1234"
  };
  render() {
    return (
      <div className="contentsWrap">
        <Write />
        <CodeView markdown={this.state.markdown} />
      </div>
    );
  }
}

export default WriteConatiner;
