import { PostConsumer } from "../../../contexts/postContext";
import { Input, Icon } from "antd";
import { Tags } from "../Tags";
import "./search.css";

const Search = ({ tagDatas }) => {
  return (
    <div className="searchWrap">
      <Tags styleClass="topTagWrap" tagDatas={tagDatas} />
      <PostConsumer>
        {({ actions }: any) => (
          <Input
            placeholder="검색어를 입력해주세요 (작성자, 제목, 해시태그)"
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
            size={"large"}
            allowClear
            onPressEnter={actions.onSearch}
          />
        )}
      </PostConsumer>
    </div>
  );
};

export default Search;
