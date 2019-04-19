import React, { Component } from "react";
import Search from "../../components/common/Search";
import Post from "../../components/post";

import axios from "axios";

interface State {
  imgUrl: string;
  postDatas: Array<object>;
}

class PostContainer extends Component<{}, State> {
  state: State = {
    imgUrl: "bg01",
    postDatas: []
  };

  componentWillMount() {
    this._getPostDatas();
  }

  _getPostDatas = async () => {
    const postDatas = await this._callPostDatasApi();
    if (!postDatas) return false;
    this.setState({
      postDatas
    });
  };

  _callPostDatasApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/post/list")
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  _onChange = e => {
    // console.log(e);
  };

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    const { postDatas } = this.state;
    return (
      <div className="contentsWrap postWrap" style={style}>
        <Search onChange={this._onChange} />
        <Post postDatas={postDatas} />
      </div>
    );
  }
}

export default PostContainer;
