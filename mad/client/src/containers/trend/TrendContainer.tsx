import React, { PureComponent } from "react";
import HashList from "../../components/HashList";
import HotPost from "../../components/HotPost";
import axios from "axios";
import { Row, Col } from "antd";
import { PostModal } from "../../components/common/Modal";

interface State {
  isOpen: boolean;
  trendDatas: object[];
  hotPostDatas: object[];
  postDatas: object[];
}
class TrendContainer extends PureComponent<{}, State> {
  state: State = {
    isOpen: false,
    trendDatas: [],
    hotPostDatas: [],
    postDatas: []
  };

  componentWillMount() {
    this.setDatas();
  }

  // 데이터 셋팅
  setDatas = async () => {
    const trendDatas = await this.callTrendDatasApi();
    const hotPostDatas = await this.callHotPostDatasApi();
    if (!trendDatas || !hotPostDatas) return false;
    this.setState({
      trendDatas: trendDatas.chartHash,
      hotPostDatas: hotPostDatas.chartLike
    });
  };

  // hash 차트
  callTrendDatasApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/chart-hash", {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => console.log(err));
  };

  // 좋아요 TOP 10
  callHotPostDatasApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/chart-like", {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => console.log(err));
  };

  // 모달 이벤트
  openModal = async (pno: number, userId: number) => {
    await this.setState({
      isOpen: !this.state.isOpen
    });

    if (!this.state.isOpen) return false;
    const postDatas = await this.callPostDatasApi(pno, userId);
    // this.setState({
    //   postDatas: postDatas.getContent
    // });
  };

  // 좋아요 TOP 10
  callPostDatasApi = (pno, userId) => {
    return axios
      .post("https://mad-server.herokuapp.com/api/post/contents", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        pno,
        userId
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => console.log(err));
  };

  render() {
    const { trendDatas, hotPostDatas, isOpen, postDatas } = this.state;

    return (
      <div className="contentsWrap trendWrap" style={{ background: "#424242" }}>
        <div className="trendBox">
          <Row gutter={24}>
            <Col span={16}>
              <h2>HASH CLOUD</h2>
              <div className="box hashBox">
                <HashList trendDatas={trendDatas} />
              </div>
            </Col>
            <Col span={8}>
              <h2>TOP 10 POST</h2>
              <div className="box hotPostBox">
                <HotPost
                  hotPostDatas={hotPostDatas}
                  openModal={this.openModal}
                />
              </div>
            </Col>
          </Row>
        </div>
        <PostModal
          postDatas={postDatas}
          openModal={this.openModal}
          isOpen={isOpen}
        />
      </div>
    );
  }
}

export default TrendContainer;
