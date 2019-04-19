import React, { Component, createContext } from "react";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: WriteConsumer } = Context;

interface State {
  title: string;
  writer: string;
  contents: string;
  hash: Array<string>;
}

class WriteProvider extends Component<{}, State> {
  state = {
    title: "",
    writer: "김혜인",
    contents: "",
    hash: []
  };

  actions = {
    setContents: contents => {
      this.setState({ contents });
    },
    setTitle: title => {
      this.setState({ title });
    },
    setHash: hash => {
      this.setState({ hash });
    },
    onSubmitPost: () => {
      if (this.state.title === "" || this.state.contents === "") {
        alert("title 혹은 contents를 작성해주세요");
        return false;
      }

      axios
        .post("https://mad-server.herokuapp.com/api/post", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          title: this.state.title,
          contents: this.state.contents,
          writer: this.state.writer,
          hash: this.state.writer
        })
        .then(response => {
          console.log("WriteProvider", response);
        });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { WriteProvider, WriteConsumer };
