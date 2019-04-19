import Link from "next/link";
import "./header.css";

const MenuBtn = () => {
  return <div className="menuBtn">Menu</div>;
};

const Logo = () => {
  return (
    <Link href="/">
      <div className="logo">MAD;</div>
    </Link>
  );
};

const PostBtn = () => {
  return (
    <Link href="/write">
      <div className="postBtn">Post</div>
    </Link>
  );
};

const Registor = ({ onModal }) => {
  return (
    <div className="loginWrap">
      <div className="login" onClick={onModal}>
        SNS login
      </div>
    </div>
  );
};

const MainHeader = ({ onModal }) => {
  return (
    <header>
      {/* <MenuBtn /> */}
      <Logo />
      <Registor onModal={onModal} />
      <PostBtn />
    </header>
  );
};

export default MainHeader;
