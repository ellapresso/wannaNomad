import { Input, Icon } from "antd";
import { Tags } from "../Tags";
import "./search.css";

const Search = ({ onSearch, tagDatas }) => {
  return (
    <div className="searchWrap">
      <Tags styleClass="topTagWrap" tagDatas={tagDatas} />
      <Input
        placeholder="검색어를 입력해주세요"
        prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
        size={"large"}
        allowClear
        onPressEnter={onSearch}
      />
    </div>
  );
};

export default Search;
