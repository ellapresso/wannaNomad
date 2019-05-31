import React, { Component } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { Tab } from "../../components/common/Tab";
import "./mypage.css";
import { PostModal } from "../../components/common/PostModal";
import { PostConsumer } from "../../contexts/postContext";

interface State {
  activeKey: String;
  userPostLength: Number;
  userInfo: Array<object>;
  myPageContentList: Array<object>;
  showOnModal: Array<object>;
  modalIsOpen: Boolean;
}

class MypageContainer extends Component<{}, State> {
  state: State = {
    activeKey: "1",
    userInfo: [],
    myPageContentList: [],
    userPostLength: 0,
    showOnModal: [],
    modalIsOpen: false
  };

  componentDidMount() {
    this.callUserDataApi();
    this.callUserPostList();
  }

  // 작성한 글
  callUserPostList = () => {
    axios
      .post("https://mad-server.herokuapp.com/api/user-writed", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId")
      })
      .then(data => {
        if (data) {
          this.setState({
            myPageContentList: data.data.writedList,
            userPostLength: data.data.writedList.length
          });
        }
      })
      .catch(err => console.log("userPostList", err));
  };

  callUserPostLike = () => {
    axios
      .post("https://mad-server.herokuapp.com/api/user-like", {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId")
      })
      .then(data => {
        if (data) {
          this.setState({
            myPageContentList: data.data.likeList
          });
        }
      })
      .catch(err => console.log("userPostLike", err));
  };
  // 유저 정보
  callUserDataApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/user", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId")
      })
      .then(({ data }) => {
        if (data) {
          this.setState({
            userInfo: data.userInfo
          });
        }
      })
      .catch(err => console.log(err));
  };

  tabHandleChange = activeKey => {
    // case 문으로 activeKey가 어떤 것이느냐에 따라서 api 콜
    // console.log("tab", activeKey);
    switch (activeKey) {
      case "1":
        this.callUserPostList();
        break;

      case "2":
        this.callUserPostLike();
        break;
    }
    this.setState({
      activeKey
    });
  };

  // 시간이 남으면 0시를 오전 24시로 표기, 1부터 9까지는 앞에 0을 붙여주자
  parsingDate(date) {
    return (
      date.getFullYear() +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 (" +
      date.getHours() +
      "시 " +
      date.getMinutes() +
      "분)"
    );
  }
  getPnoFromChild = dataFromChild => {
    console.log(dataFromChild, "CLICKED!!");
    let findValue = this.state.myPageContentList.filter(
      d => d.pno === dataFromChild
    );

    if (findValue) {
      this.setState({
        showOnModal: findValue,
        modalIsOpen: true
      });
    }
  };
  closeTheModalByBtn = fromChild => {
    console.log("lets close", fromChild);
    this.setState({
      modalIsOpen: fromChild
    });
  };
  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };

    return (
      <PostConsumer>
        {({ state }: any) => (
          <div className="contentsWrap postWrap myPage" style={style}>
            {PostModal(
              this.state.showOnModal,
              this.state.modalIsOpen,
              this.closeTheModalByBtn
            )}
            <div className="mypage_wrap">
              <div className="mypage_content">
                {this.state.userInfo.map((d, index) => {
                  let parseTime = new Date(d.update_day);
                  return (
                    <div key={index} className="mypage_content_header">
                      <div className="mypage_profile">
                        <img src={d.thumbnail_image} alt="유저 프로필" />
                      </div>
                      <div className="mypage_title">
                        <h1>{d.nickname}님의 마이페이지</h1>
                        <div className="user_status">
                          <span>
                            최근 방문일&nbsp;&nbsp;|&nbsp;&nbsp;
                            {this.parsingDate(parseTime)}
                          </span>
                        </div>
                        <div className="user_status">
                          <span>
                            작성된 글{" "}
                            <strong>{this.state.userPostLength}</strong>개
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mypage_content_body">
                  <div className="card-container">
                    <Tabs
                      type="card"
                      onChange={this.tabHandleChange}
                      activeKey={this.state.activeKey}
                    >
                      {/* my_prop =>  tab 내부 컨텐츠*/}
                      <Tab
                        tab={"내가 쓴 글"}
                        key={"1"}
                        my_prop={this.getPnoFromChild}
                        userFavoriteList={this.state.myPageContentList}
                      />
                      <Tab
                        tab={"내가 좋아한 글"}
                        key={"2"}
                        my_prop={this.getPnoFromChild}
                        userFavoriteList={this.state.myPageContentList}
                        callbackFromParent={this.myCallback}
                      />
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </PostConsumer>
    );
  }
}

export default MypageContainer;
