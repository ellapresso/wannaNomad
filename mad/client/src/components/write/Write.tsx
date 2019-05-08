import React, { Component } from "react";
import { WriteConsumer } from "../../contexts/writeContext";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./write.css";
// CodeMirror를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

interface Props {
  contents: string;
  setContents: any;
}
interface State {}

class Editor extends Component<Props, State> {
  render() {
    return (
      <div className="codemirror">
        <CodeMirror
          value={this.props.contents}
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.props.setContents(value);
          }}
        />
      </div>
    );
  }
}

const Write = () => (
  <WriteConsumer>
    {({ state, actions }: any) => (
      <Editor contents={state.contents} setContents={actions.setContents} />
    )}
  </WriteConsumer>
);

export default Write;
