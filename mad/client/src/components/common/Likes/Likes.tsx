import { PostConsumer } from "../../../contexts/postContext";
import { Statistic, Icon, message } from "antd";
import "./likes.css";

const Likes = ({ likeDatas, love, pno }) => {
  const color = love === 1 ? "#f5222d" : "#ccc";
  const likeEvt = actions => {
    if (localStorage.getItem("loginId")) {
      return love === 1 ? actions.offLike(pno) : actions.onLike(pno);
    } else {
      return message.warning("로그인 후 이용해 주세요");
    }
  };

  return (
    <PostConsumer>
      {({ actions }: any) => (
        <div
          className="likeWrap"
          onClick={() => {
            likeEvt(actions);
          }}
        >
          <Statistic
            value={likeDatas}
            prefix={<Icon type="heart" theme="filled" />}
            valueStyle={{ fontSize: 18, lineHeight: "20px", color: color }}
          />
        </div>
      )}
    </PostConsumer>
  );
};

export default Likes;
