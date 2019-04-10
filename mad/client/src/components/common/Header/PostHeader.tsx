import Router from "next/router";
import { Modal, Icon } from "antd";
const confirm = Modal.confirm;
import "./header.css";

const _historyBack = () => {
  Router.back();
};
const _postOk = () => {
  console.log("확인");
};

const _showConfirm = (content, onOk) => {
  confirm({
    title: "mad-blog",
    content: content,
    onOk() {
      onOk();
    }
  });
};

const BackBtn = () => {
  return (
    <div
      className="backBtn"
      onClick={() => {
        _showConfirm(
          "작성중이던 포스트가 있습니다. 정말로 나가시겠습니까?",
          _historyBack
        );
      }}
    >
      <Icon type="left" style={{ fontSize: "32px" }} />
    </div>
  );
};

const TitleInput = () => {
  return (
    <div className="title">
      <input placeholder="제목을 입력해주세요" />
    </div>
  );
};

const PostBtn = () => {
  return (
    <div
      className="postBtn"
      onClick={() => {
        _showConfirm("글을 등록하시겠습니까?", _postOk);
      }}
    >
      Post
    </div>
  );
};

const PostHeader = () => {
  return (
    <header className="postHeader">
      <BackBtn />
      <TitleInput />
      <PostBtn />
    </header>
  );
};

export default PostHeader;
