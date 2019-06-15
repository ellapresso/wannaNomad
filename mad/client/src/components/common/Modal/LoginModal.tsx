import { Icon } from "antd";
import { AuthConsumer } from "../../../contexts/authContext";
import "./modal.css";

const LoginModal = () => {
  return (
    <AuthConsumer>
      {({ state, actions }: any) => (
        <div className={`modalWrap ${state.isModal ? "" : "hidden"}`}>
          <div className="modal">
            <div className="modalHeader">
              <h2>
                지금 mad-blog를 시작해보세요 :-)
                <span className="modalClose" onClick={actions.onModal}>
                  <Icon type="close" />
                </span>
              </h2>
            </div>
            <div className="modalBody">
              <div className="loginBtn">
                <div onClick={actions.onLogin}> 카카오로그인</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthConsumer>
  );
};

export default LoginModal;
