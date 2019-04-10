import { Tag, Tooltip } from "antd";
import "./tags.css";

type TagItem = {
  tagList: Array<number>;
};

const TagItem = ({ tagList }: TagItem) => {
  const tagColor = ["#87d068", "#f55f55", "#108ee9", "#deaddd", "#aaddee"];
  const tagNum = Math.round(Math.random() * (tagColor.length - 1));
  return (
    <Tooltip placement="top" title={tagList}>
      <Tag color="#108ee9">{tagList}</Tag>
    </Tooltip>
  );
};

const Tags = ({ tagDatas }) => {
  const tagList = tagDatas.map((tagData, index) => {
    return <TagItem tagList={tagData} key={index} />;
  });
  return <div className="tagWrap">{tagList}</div>;
};

export default Tags;
