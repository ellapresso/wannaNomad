/**
 * 게시글 작성 및 수정 관련 context
 */
import React, { Component, createContext } from "react";
import Router from "next/router";
import moment from "moment";
import axios from "axios";

//Context 생성
const Context = createContext({});
const { Provider, Consumer: MypageConsumer } = Context;

/**
 * mode: 현재 write Component의 모드 (edit:수정)
 * setLoading : 로딩 처리 이벤트
 * pno: post id (수정)
 * isEdit: 수정 모드 여부 (수정)
 * title: post 제목 (등록/수정)
 * contents: post 내용 (등록/수정)
 * hash: post 해시태그 (등록/수정)
 * beforeHash: 수정전 해시 태그 (수정)
 * setTitle: post 제목 설정 이벤트 (등록)
 * setContents: post 내용 설정 이벤트 (등록)
 * setHash: post 해시태그 설정 이벤트 (등록)
 * onSubmitPost: post 등록 이벤트 (등록)
 * onEdit: post 수정 이벤트 (수정)
 * onLike: post 좋아요 이벤트 (pno : post id)
 * offLike: post 좋아요 취소 이벤트 (pno : post id)
 */

interface Props {
  isLogin: boolean;
  setLoading: any;
}

interface State {
  postDatas: object[];
  isLogin: Boolean;
  postCnt: number;
  isMoreBtn: Boolean;
  keyword: string;
}

class MypageProvider extends Component<Props, State> {
  state: State = {
    postDatas: [],
    isLogin: false,
    postCnt: 4,
    isMoreBtn: false,
    keyword: ""
  };

  componentDidMount() {
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!localStorage.getItem("loginId")) {
      Router.replace("/");
      return false;
    }
  }
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

  CallUserDataApi = () => {
    this.props.setLoading();
    axios
      .get("https://mad-server.herokuapp.com/api/user", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        params: {
          userId: 2
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { MypageProvider, MypageConsumer };
