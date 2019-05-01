import React, { Component } from "react";
import { WriteConsumer } from "../../contexts/writeContext";
import Write from "../../components/write";
import CodeView from "../../components/common/CodeView";
import { TagsEdit } from "../../components/common/Tags";

class WriteConatiner extends Component {
  render() {
    return (
      <div className="contentsWrap">
        <Write />
        <CodeView />
        <WriteConsumer>
          {({ state, actions }: any) => (
            <TagsEdit hash={state.hash} setHash={actions.setHash} />
          )}
        </WriteConsumer>
      </div>
    );
  }
}

export default WriteConatiner;
