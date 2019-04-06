import React, { Component } from "react";
import Search from "../../components/common/Search";
import Post from "../../components/post";
interface Props {}
interface State {
  imgUrl: string;
}

class PostContainer extends Component<Props, State> {
  state: State = {
    imgUrl: "bg01"
  };
  componentWillMount() {
    // this.getImgUrl();
  }

  getImgUrl = () => {
    const imgArray = ["bg01", "bg02", "bg03", "bg04", "bg05", "bg06", "bg07"];
    const imgNum = Math.round(Math.random() * 6);
    console.log(imgArray[imgNum]);
    this.setState({
      imgUrl: imgArray[imgNum]
    });
  };

  onChange = e => {
    console.log(e);
  };

  render() {
    const style = {
      backgroundImage: `url(/static/images/bg03.jpg)`
    };
    return (
      <div className="postWrap" style={style}>
        <Search onChange={this.onChange} />
        <Post />
      </div>
    );
  }
}

export default PostContainer;
