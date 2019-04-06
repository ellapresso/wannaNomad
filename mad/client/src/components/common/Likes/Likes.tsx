import { Statistic, Icon } from "antd";
import "./likes.css";

const Likes = ({ likeDatas }) => {
  return (
    <div className="likeWrap">
      <Statistic
        value={likeDatas}
        prefix={<Icon type="heart" theme="filled" />}
        valueStyle={{ fontSize: 18, lineHeight: "20px" }}
      />
    </div>
  );
};

export default Likes;
