import { Col, Row, Avatar } from "antd";
import Tags from "../../components/common/Tags";
import Likes from "../../components/common/Likes";
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
            <Avatar style={{ backgroundColor: "#130" }}>
              {PostData.user.substring(1)}
            </Avatar>
            <span>BY. {PostData.user}</span>
          </span>
          <span>{PostData.createAt}</span>
        </div>
      </div>
      <div className="postListBody" />
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
      body: "# 1234",
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
      body: "body",
      tag: ["프론트개발", "자바스크립트", "리액트"],
      totalLikes: 30
    }
  ];

  const postList = PostDatas.map((PostData, index) => {
    return (
      <Col span={12} key={index}>
        <PostItem PostData={PostData} />
      </Col>
    );
  });
  return (
    <Row type="flex" justify="space-between" gutter={16} className="posthWrap">
      {postList}
    </Row>
  );
};

export default Post;
