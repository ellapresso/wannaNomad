import { Icon } from "antd";
import "./modal.css";

interface Props {
  isOpen: boolean;
  onModal: any;
}

const LoginModal = ({ isOpen, onModal }: Props) => {
  const view = isOpen ? "" : "hidden";
  return (
    <div className={`modalWrap ${view}`}>
      <div className="modal">
        <div className="modalHeader">
          <h2>
            지금 mad-blog를 시작해보세요 :-)
            <span className="modalClose" onClick={onModal}>
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <div className="loginBtn">
            <div className="kakao-login-btn" />
            <div className="google-login-btn">
              <Icon type="google" style={{ marginRight: 12, fontSize: 22 }} />
              구글 계정으로 로그인
            </div>
            <div className="github-login-btn">
              <Icon type="github" style={{ marginRight: 12, fontSize: 22 }} />
              깃허브 계정으로 로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
