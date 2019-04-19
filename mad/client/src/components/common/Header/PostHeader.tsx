import Router from "next/router";
import { WriteConsumer } from "../../../contexts/writeContext";
import { Modal, Icon } from "antd";
const confirm = Modal.confirm;
import "./header.css";

// confirm
const showConfirm = (content: string, onOk: any) => {
  confirm({
    title: "mad-blog",
    content: content,
    onOk() {
      onOk();
    }
  });
};

// 뒤로가기
const BackBtn = () => {
  const historyBack = () => {
    Router.push("/");
  };
  return (
    <div
      className="backBtn"
      onClick={() => {
        showConfirm(
          "작성중이던 포스트가 있습니다. 정말로 나가시겠습니까?",
          historyBack
        );
      }}
    >
      <Icon type="left" style={{ fontSize: "32px" }} />
    </div>
  );
};

// title 작성
const TitleInput = ({ value, setTitle }) => {
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  return (
    <div className="title">
      <input
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={onChangeTitle}
      />
    </div>
  );
};

// 글 등록
const PostBtn = ({ onSubmitPost }) => {
  const postOk = () => {
    onSubmitPost();
  };
  return (
    <div
      className="postBtn"
      onClick={() => {
        showConfirm("글을 등록하시겠습니까?", postOk);
      }}
    >
      Post
    </div>
  );
};

const PostHeader = () => {
  return (
    <WriteConsumer>
      {({ state, actions }: any) => (
        <header className="postHeader">
          <BackBtn />
          <TitleInput value={state.title} setTitle={actions.setTitle} />
          <PostBtn onSubmitPost={actions.onSubmitPost} />
        </header>
      )}
    </WriteConsumer>
  );
};

export default PostHeader;
