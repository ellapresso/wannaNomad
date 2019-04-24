import { Tag, Tooltip } from "antd";
import "./tags.css";

interface TagItem {
  tagList: Array<number>;
}

const TagItem = ({ tagList }: TagItem) => {
  const isLongTag = tagList.length > 6;
  const tag = (
    <Tag color="#108ee9">
      {isLongTag ? `${tagList.slice(0, 6)}...` : tagList}
    </Tag>
  );
  return isLongTag ? <Tooltip title={tagList}>{tag}</Tooltip> : tag;
};

const Tags = ({ tagDatas }) => {
  const tagList = tagDatas.map((tagData, index) => {
    return <TagItem tagList={tagData} key={index} />;
  });
  return <div className="tagWrap">{tagList}</div>;
};

export default Tags;
