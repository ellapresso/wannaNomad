import { Tag, Tooltip } from "antd";
import "./tags.css";

interface TagItem {
  tagList: Array<number>;
}

const TagItem = ({ tagList }: TagItem) => {
  const isLongTag = tagList.length > 6;
  const tag = (
    <Tag color="#000">{isLongTag ? `${tagList.slice(0, 6)}...` : tagList}</Tag>
  );
  return isLongTag ? <Tooltip title={tagList}>{tag}</Tooltip> : tag;
};

const Tags = ({ tagDatas, styleClass }) => {
  const tagList = tagDatas.map((tagData, index) => {
    return <TagItem tagList={tagData} key={index} />;
  });
  return <div className={styleClass}>{tagList}</div>;
};

export default Tags;
