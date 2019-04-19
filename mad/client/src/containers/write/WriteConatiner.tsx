import React, { Component } from "react";
import Write from "../../components/write";
import CodeView from "../../components/common/CodeView";

class WriteConatiner extends Component {
  render() {
    return (
      <div className="contentsWrap">
        <Write />
        <CodeView />
      </div>
    );
  }
}

export default WriteConatiner;
