import { Col, Row, Avatar } from "antd";
import moment from "moment";

// components
import Tags from "../common/Tags";
import Likes from "../common/Likes";
import CodeView from "../common/CodeView/CodeView";

import "./post.css";

type PostItem = {
  title: string;
  user: string;
  createAt: string;
  updateAt: string;
  body: string;
  tag: Array<string>;
  totalLikes: number;
};

const PostItem = ({ PostData }) => {
  return (
    <div className="postList">
      <div className="postListHeader">
        <p>{PostData.title}</p>
        <div className="postInfo">
          <span>
            <Avatar style={{ backgroundColor: "#130", marginRight: 10 }}>
              {PostData.user.substring(1)}
            </Avatar>
            <span>BY. {PostData.user}</span>
          </span>
          <span className="postDate">
            {moment(PostData.createAt).format("MMM Do YY")}
          </span>
        </div>
      </div>
      <div className="postListBody">
        <CodeView markdown={PostData.body} type="post" />
      </div>
      <div className="postListfooter">
        <Tags tagDatas={PostData.tag} />
        <Likes likeDatas={PostData.totalLikes} />
      </div>
    </div>
  );
};

const Post = () => {
  const PostDatas = [
    {
      title: "title",
      user: "김혜인",
      createAt: "2019-01-03",
      updateAt: "2019-01-03",
      body:
        "Hseded\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n\n  *[Francesco Agnoletto](https://twitter.com/fragno92)*",
      tag: [
        "프론트개발",
        "자바스크립트",
        "리액트",
        "프론트개발",
        "자바스크립트"
      ],
      totalLikes: 30
    },
    {
      title: "오늘의 코드 기록 02",
      user: "황윤지",
      createAt: "2019-01-02",
      updateAt: "2019-01-02",
      body: "# DatePicker The DatePicker works",
      tag: ["백엔드개발", "자바스크립트", "노드"],
      totalLikes: 30
    },
    {
      title: "오늘의 코드 기록 03",
      user: "김철수",
      createAt: "2019-01-01",
      updateAt: "2019-01-01",
      body:
        "> 안녕하세요 \n ```javascript \n const a = 1;\n console.log(a); // 1 \n```",
      tag: ["프론트개발", "자바스크립트", "리액트"],
      totalLikes: 30
    }
  ];

  const postList = PostDatas.map((PostData, index) => {
    return (
      <Col xs={24} md={24} lg={24} xl={12} key={index}>
        <PostItem PostData={PostData} />
      </Col>
    );
  });
  return (
    <Row type="flex" justify="space-between" gutter={32} className="posthWrap">
      {postList}
    </Row>
  );
};

export default Post;
