import React, { Component } from "react";
import moment from "moment";
import { List, Avatar } from "antd";
import "./hotPost.css";

interface Props {
  hotPostDatas: object[];
  openModal: (pno: number, userId: number) => void;
}

interface Item {
  pno: number;
  title: string;
  thumbnail_image: string;
  nickname: string;
  wrDate: string;
  likeCnt: number;
}

const HotPost = ({ hotPostDatas, openModal }: Props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={hotPostDatas}
      renderItem={(item: Item) => (
        <List.Item
          className="listWrap"
          onClick={() => {
            openModal(item.pno, 1065974454);
          }}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.thumbnail_image} />}
            title={item.title}
            description={`${item.nickname} (${moment(item.wrDate).format(
              "YYYY-MM-DD"
            )})`}
          />
          <span>{item.likeCnt}</span>
          <span
            className="hotChart"
            style={{
              width: `${item.likeCnt}%`
            }}
          />
        </List.Item>
      )}
    />
  );
};

export default HotPost;
