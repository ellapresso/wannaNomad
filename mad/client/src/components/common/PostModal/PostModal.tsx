import { Icon } from "antd";
import "./modal.css";
import Post from "../../Post";

const PostModal = (data, isOpen, fn) => {
  const returnToParents = () => {
    fn(!isOpen);
  };
  console.log("dddd", data);
  return (
    <div className={isOpen ? "modalWrap" : "modalWrap hidden"}>
      <div className="modal myPage">
        <div className="modalHeader">
          <h2>
            <span className="modalClose" onClick={returnToParents}>
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <div>
            <Post postDatas={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
