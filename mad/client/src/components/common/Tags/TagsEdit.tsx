import React, { Component } from "react";
import { Tag, Icon, Input, message } from "antd";
import "./tags.css";

interface Props {
  hash: Array<string>;
  setHash: any;
}
interface State {
  tags: Array<string>;
  inputVisible: boolean;
  inputValue: string;
}

class TagsEdit extends Component<Props, State> {
  state: State = {
    tags: [],
    inputVisible: false,
    inputValue: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.hash
    });
  }

  //태그 제거
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags }, () => {
      this.props.setHash(this.state.tags);
    });
  };

  // 인풋 생성
  showInput = () => {
    if (this.state.tags.length >= 10) {
      message.warning("Hash는 10개까지 작성하실수 있습니다.");
      return false;
    }
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  // 인풋값 변경
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // 인풋 값 저장
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

  input;
  saveInputRef = input => (this.input = input);

  render() {
    return (
      <div className="tagEditor">
        {this.state.tags.map((tag, index) => {
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
            ref={this.saveInputRef}
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
            <Icon type="plus" /> New Hash
          </Tag>
        )}
      </div>
    );
  }
}

export default TagsEdit;
