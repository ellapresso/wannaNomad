import { AuthConsumer } from "../../contexts/authContext";
import Router from "next/router";
import { Col, Row, Avatar, Icon } from "antd";
import moment from "moment";

// components
import { Tags } from "../common/Tags";
import Likes from "../common/Likes";
import { Code } from "../common/CodeView/CodeView";

import "./post.css";

const PostMenu = ({ pno }) => {
  return (
    <div className="postMenuBtn">
      <Icon type="more" />
      <div className="postMenu">
        <span
          onClick={() => {
            Router.replace(`/write?mode=edit&pno=${pno}`);
          }}
        >
          수정
        </span>
        <AuthConsumer>
          {({ actions }: any) => (
            <span
              onClick={() => {
                actions.onDelete(pno);
              }}
            >
              삭제
            </span>
          )}
        </AuthConsumer>
      </div>
    </div>
  );
};

interface PostItem {
  postData: {
    pno: number;
    title: string;
    writer: string;
    wrDate: string;
    upDate: string;
    contents: string;
    hashes: string;
    thumbnail_image: string;
    nowUser?: number;
    likes: number;
    love: number;
  };
}

const PostItem = ({ postData }: PostItem) => {
  const hashArry = postData.hashes ? postData.hashes.split(",") : [];
  return (
    <div className="postList">
      <div className="postListHeader">
        <div className="postListTitle">
          {postData.title}
          {postData.nowUser ? <PostMenu pno={postData.pno} /> : null}
        </div>
        <div className="postInfo">
          <span>
            <Avatar
              src={postData.thumbnail_image}
              style={{ backgroundColor: "#000", marginRight: 10 }}
            >
              {postData.writer.substring(0, 1).toUpperCase()}
            </Avatar>
            <span>BY. {postData.writer}</span>
          </span>
          <span className="postDate">
            {moment(postData.wrDate).format("ll")}
          </span>
        </div>
      </div>
      <div className="postListBody">
        <Code markdown={postData.contents} type="post" />
      </div>
      <div className="postListfooter">
        <Tags tagDatas={hashArry} styleClass="tagWrap" />
        <Likes
          likeDatas={postData.likes}
          love={postData.love}
          pno={postData.pno}
        />
      </div>
    </div>
  );
};

const Post = ({ postDatas }) => {
  let postList = postDatas.map((postData, index) => {
    return (
      <Col xs={24} md={24} lg={24} xl={12} key={index}>
        <PostItem postData={postData} />
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
