import React, { Component } from "react";
import { WriteConsumer } from "../../../contexts/writeContext";
import marked from "marked";
import "./codeView.css";

// prism 관련 코드 불러오기
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
require("prismjs/components/prism-bash.min.js");
require("prismjs/components/prism-javascript.min.js");
require("prismjs/components/prism-jsx.min.js");
require("prismjs/components/prism-css.min.js");

interface Props {
  type: string;
  markdown: string;
  setContents?: any;
}
interface State {
  html: string;
}

export class Code extends Component<Props, State> {
  constructor(props) {
    super(props);
    const { markdown } = props;

    this.state = {
      html: markdown
        ? marked(props.markdown, { breaks: true, sanitize: true })
        : ""
    };
  }
  _renderMarkdown = () => {
    const { markdown } = this.props;

    if (!markdown) {
      this.setState({ html: "" });
      return;
    }
    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // 마크다운 내부 html 무시
      })
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markdown !== this.props.markdown) {
      this._renderMarkdown();
    }
    // console.log(prevProps, prevState);
    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { html } = this.state;
    const { type } = this.props;
    const markup = {
      __html: html
    };

    return (
      <div className={`codeView ${type}`} dangerouslySetInnerHTML={markup} />
    );
  }
}

const CodeView = () => (
  <WriteConsumer>
    {({ state, actions }: any) => {
      return (
        <Code
          markdown={state.contents}
          setContents={actions.setContents}
          type="write"
        />
      );
    }}
  </WriteConsumer>
);

export default CodeView;
