import React, { Component, Fragment } from "react";
import { WriteConsumer } from "../../contexts/writeContext";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Tag, Icon, Input } from "antd";
import "./write.css";
// CodeMirror를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

interface Props {
  contents: string;
  hash: Array<string>;
  setContents: any;
  setHash: any;
}
interface State {
  tags: Array<string>;
  inputVisible: boolean;
  inputValue: string;
}

class Editor extends Component<Props, State> {
  state: State = {
    tags: [],
    inputVisible: false,
    inputValue: ""
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags }, () => {
      this.props.setHash(this.state.tags);
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState(
      {
        tags,
        inputVisible: false,
        inputValue: ""
      },
      () => {
        this.props.setHash(this.state.tags);
      }
    );
  };

  renderEditTag = () => {
    return (
      <Fragment>
        {this.props.hash.map((tag, index) => {
          const tagList = (
            <Tag
              key={index}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              {tag}
            </Tag>
          );
          return tagList;
        })}
        {this.state.inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!this.state.inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: "#fff", borderStyle: "dashed" }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </Fragment>
    );
  };

  render() {
    return (
      <div className="editor">
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
        <div className="tagEditor">
          <span>태그 입력 :</span>
          {this.renderEditTag()}
        </div>
      </div>
    );
  }
}

const Write = () => (
  <WriteConsumer>
    {({ state, actions }: any) => (
      <Editor
        contents={state.contents}
        setContents={actions.setContents}
        hash={state.hash}
        setHash={actions.setHash}
      />
    )}
  </WriteConsumer>
);

export default Write;
