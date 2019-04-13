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

  _onEditTxt(markdown) {
    console.log(markdown);
    this.setState({
      markdown
    });
  }

  render() {
    return (
      <div className="contentsWrap">
        <Write onEditTxt={this._onEditTxt} />
        <CodeView markdown={this.state.markdown} type="write" />
      </div>
    );
  }
}

export default WriteConatiner;
