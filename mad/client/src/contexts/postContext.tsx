/**
 * 게시글 관련 context
 */
import React, { Component, createContext } from "react";
import moment from "moment";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: PostConsumer } = Context;

/**
 * postDatas: post 관련 json 데이터
 * setLoading : 로딩 처리 이벤트
 * postCnt: 보여줄 post 갯수
 * isMoreBtn: 더보기 display 여부
 * keyword: 검색 조건
 * onDelete: post 삭제 이벤트 (pno : post id)
 * onLike: post 좋아요 이벤트 (pno : post id)
 * offLike: post 좋아요 취소 이벤트 (pno : post id)
 * onMore: 더보기 이벤트
 * onSearch: 검색 이벤트 (e : 이벤트 객체)
 */

interface Props {
  postDatas: Array<object>;
  setLoading: any;
}

interface State {
  postDatas: Array<object>;
  postCnt: number;
  isMoreBtn: Boolean;
  keyword: string;
}

class PostProvider extends Component<Props, State> {
  state: State = {
    postDatas: [],
    postCnt: 4,
    isMoreBtn: false,
    keyword: ""
  };

  actions = {
    onDelete: pno => {
      this.props.setLoading();
      axios
        .post("https://mad-server.herokuapp.com/api/post/del", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          writer: localStorage.getItem("loginId"),
          upDate: moment().format("YYYY-MM-DD H:mm:ss")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onLike: pno => {
      this.props.setLoading();
      axios
        .post("https://mad-server.herokuapp.com/api/like", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: localStorage.getItem("loginId")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    offLike: pno => {
      this.props.setLoading();
      axios
        .post("https://mad-server.herokuapp.com/api/unlike", {
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          pno,
          userId: localStorage.getItem("loginId")
        })
        .then(res => {
          this.getPostDatas();
        })
        .catch(err => console.log(err));
    },
    onMore: () => {
      this.props.setLoading();
      this.setState(
        {
          postCnt: this.state.postCnt + 4
        },
        () => {
          this.getPostDatas();
        }
      );
    },
    onSearch: e => {
      this.props.setLoading();
      const target = e.target;
      const keyword = target.value ? target.value : target.dataset.keyword;
      this.setState({ keyword }, () => {
        this.getPostDatas();
      });
    }
  };

  //componentWillReceiveProps:컴포넌트가 prop 을 새로 받았을 때 실행
  componentWillReceiveProps(nextProps) {
    this.setState({
      postDatas: nextProps.postDatas,
      isMoreBtn: true
    });
  }

  //shouldComponentUpdate:prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드, true일때 만 리렌더링
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.postDatas === this.state.postDatas;
  // }

  /**
   * posts 관련 json 데이터 state 저장
   */
  getPostDatas = async () => {
    const postDatas = await this.callPostDatasApi();
    this.props.setLoading();
    if (!postDatas) return false;
    this.setState({
      isMoreBtn:
        this.state.postCnt >= postDatas.totalPost.totalCnt ? false : true,
      postDatas: postDatas.post,
      keyword: ""
    });
  };

  /**
   * posts 관련 데이터 조회
   */
  callPostDatasApi = () => {
    const { postCnt, keyword } = this.state;
    return axios
      .post("https://mad-server.herokuapp.com/api/post/list", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        userId: localStorage.getItem("loginId"),
        page: postCnt,
        search: keyword
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => console.log(err));
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { PostProvider, PostConsumer };
