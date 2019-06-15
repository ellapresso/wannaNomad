import Link from "next/link";

import { Modal, message } from "antd";
const confirm = Modal.confirm;
import "./header.css";

// confirm
const showConfirm = (content: string, onOk: () => void) => {
  confirm({
    title: "mad-blog",
    content: content,
    onOk() {
      onOk();
    }
  });
};

const MenuBtn = ({ onMenu }) => {
  return (
    <div className="LeftBtn" onClick={onMenu}>
      MENU
    </div>
  );
};

const Login = ({ onModal }: any) => {
  return (
    <div className="login" onClick={onModal}>
      login
    </div>
  );
};

const Logout = ({ onLogOut }: any) => {
  return (
    <div
      className="login"
      onClick={() => {
        showConfirm("로그아웃 하시겠습니까?", onLogOut);
      }}
    >
      logout
    </div>
  );
};

const PostBtn = () => {
  const alertEvt = () => {
    message.warning("로그인 후 이용해 주세요");
  };
  return (
    <div className="postBtn" onClick={alertEvt}>
      Post
    </div>
  );
};

const MainHeader = ({ state, actions }) => {
  return (
    <header>
      <MenuBtn onMenu={actions.onMenu} />
      <div className="LeftBtn">
        {state.isLogin ? (
          <Logout onLogOut={actions.onLogOut} />
        ) : (
          <Login onModal={actions.onModal} />
        )}
      </div>
      <div className="logo">
        <Link href="/">
          <span>MAD;</span>
        </Link>
      </div>
      <div className="postBtn">
        {state.isLogin ? (
          <Link href="/write">
            <span>Post</span>
          </Link>
        ) : (
          <PostBtn />
        )}
      </div>
    </header>
  );
};

export default MainHeader;
