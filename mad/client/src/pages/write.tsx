import React, { Component } from "react";
import { WriteProvider } from "../contexts/writeContext";
import EditorConatiner from "../containers/write/EditorConatiner";
import PreviewContainer from "../containers/write/PreviewContainer";

interface Props {}

interface State {}

class Write extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      <WriteProvider>
        <div>Write121212</div>
        <EditorConatiner />
        <PreviewContainer />
      </WriteProvider>
    );
  }
}

export default Write;
