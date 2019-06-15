import Link from "next/link";
import { Drawer, Avatar } from "antd";
import "./menu.css";

const Menu = ({ state, actions }) => {
  return (
    <Drawer
      placement={"left"}
      closable={true}
      onClose={actions.onMenu}
      visible={state.isMenu}
    >
      {state.userName ? (
        <div className="userInfo">
          <Avatar
            src={state.userImg}
            size={150}
            style={{ backgroundColor: "#000" }}
          >
            {state.userName.substring(0, 1).toUpperCase()}
          </Avatar>
          <p>{state.userName}</p>
        </div>
      ) : (
        <div className="userInfo">
          <Avatar size={150} style={{ backgroundColor: "#000" }}>
            MAD
          </Avatar>
          <p>MAD BLOG</p>
        </div>
      )}
      <ul className="menuList">
        <li>
          <Link href="/trend">
            <span>트렌딩 차트</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
      </ul>
      <div className="menuFooter">
        <div className="catImg" />
        <Link href="/">
          <h3>프로젝트 소개</h3>
        </Link>
        <div className="gitHub">
          <p>GitHub</p>
          <ul>
            <li>황윤지 /</li>
            <li> 김혜인 /</li>
            <li>유윤선</li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default Menu;
