import Link from "next/link";
import { Icon } from "antd";
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

const Header = () => {
  return (
    <header>
      <MenuBtn />
      <Logo />
      <PostBtn />
    </header>
  );
};

export default Header;
