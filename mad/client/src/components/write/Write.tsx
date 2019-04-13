import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./write.css";
// CodeMirror를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

interface Props {
  onEditTxt: any;
}
interface State {
  markdown: string;
}

class Write extends Component<Props, State> {
  state: State = {
    markdown: "# 1234"
  };

  render() {
    return (
      <div className="editor">
        <CodeMirror
          value={this.state.markdown}
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({
              markdown: value
            });
          }}
        />
      </div>
    );
  }
}

export default Write;
