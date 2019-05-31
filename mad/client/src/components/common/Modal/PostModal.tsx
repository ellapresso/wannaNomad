import { Icon } from "antd";
import Post from "../../Post";
import "./modal.css";

const PostModal = ({ postDatas, openModal, isOpen }) => {
  return (
    <div className={isOpen ? "modalWrap" : "modalWrap hidden"}>
      <div className="modal">
        <div className="">
          <h2>
            <span className="modalClose" onClick={openModal}>
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <Post postDatas={postDatas} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
