import React, { PureComponent } from "react";
import axios from "axios";
import { PostConsumer } from "../../contexts/postContext";
import Search from "../../components/common/Search";
import Post from "../../components/Post";
import { MoreBtn } from "../../components/common/Button";

interface State {
  hashLank: Array<string>;
}

class PostContainer extends PureComponent<{}, State> {
  state: State = {
    hashLank: []
  };

  componentDidMount() {
    this.getHashLank();
    // this.callTest();
  }

  //post 데이터 가져오기
  getHashLank = async () => {
    const hashLank = await this.callHashLankApi();
    if (!hashLank) return false;
    this.setState({
      hashLank: hashLank.split(",")
    });
  };

  //API 호출
  callHashLankApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/hash/rank")
      .then(({ data }) => {
        return data.rankHash.rankHash;
      })
      .catch((err: object) => console.log(err));
  };

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    return (
      <PostConsumer>
        {({ state }: any) => (
          <div className="contentsWrap mainWrap" style={style}>
            <div className="postWrap">
              <Search tagDatas={this.state.hashLank} />
              <Post postDatas={state.postDatas} />
              <MoreBtn />
            </div>
          </div>
        )}
      </PostConsumer>
    );
  }
}

export default PostContainer;
