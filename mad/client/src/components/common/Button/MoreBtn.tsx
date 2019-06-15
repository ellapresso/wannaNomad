import { PostConsumer } from "../../../contexts/postContext";
import "./button.css";

const MoreBtn = () => {
  return (
    <PostConsumer>
      {({ state, actions }: any) => (
        <div
          className={`modeBtn ${state.isMoreBtn ? "" : "hidden"}`}
          onClick={() => {
            actions.onMore();
          }}
        >
          더보기
        </div>
      )}
    </PostConsumer>
  );
};

export default MoreBtn;
