import { PostConsumer } from "../../../contexts/postContext";
import { Tag, Tooltip } from "antd";
import "./tags.css";

interface TagItem {
  tagList: Array<number>;
}

const TagItem = ({ tagList }: TagItem) => {
  const isLongTag = tagList.length > 6;
  const tag = (
    <PostConsumer>
      {({ actions }: any) => (
        <Tooltip title={tagList}>
          <Tag color="#000" onClick={actions.onSearch} data-keyword={tagList}>
            {isLongTag ? `${tagList.slice(0, 6)}...` : tagList}
          </Tag>
        </Tooltip>
      )}
    </PostConsumer>
  );
  return tag;
};

const Tags = ({ tagDatas, styleClass }) => {
  const tagList = tagDatas.map((tagData, index) => {
    return <TagItem tagList={tagData} key={index} />;
  });
  return <div className={styleClass}>{tagList}</div>;
};

export default Tags;
