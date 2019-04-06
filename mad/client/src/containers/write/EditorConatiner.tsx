import React, { Component } from "react";
import Write from "../../components/write";

interface Props {}
interface State {}
class EditorConatiner extends Component<Props, State> {
  state: State = {};
  render() {
    return (
      <div>
        <h1>EditorConatiner</h1>
        <Write />
      </div>
    );
  }
}

export default EditorConatiner;
