import { Input, Icon } from "antd";
import Tags from "../Tags";
import "./search.css";

const Search = ({ onChange }) => {
  return (
    <div className="searchWrap">
      <Tags
        tagDatas={["태그순위01", "태그02", "태그순위03", "태그순위태그순위04"]}
      />
      <Input
        placeholder="검색어를 입력해주세요"
        prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
        size={"large"}
        allowClear
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
