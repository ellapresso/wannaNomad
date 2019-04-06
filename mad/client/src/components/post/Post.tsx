import "./post.css";
type PostItem = { title: string; body: string; footer: string };

const PostItem = ({ title, body, footer }: PostItem) => {
  return (
    <div className="postList">
      <div className="postListHeader">
        <p>{title}</p>
      </div>
      <div className="postListBody">
        <p>{body}</p>
      </div>
      <div className="postListfooter">
        <p>{footer}</p>
      </div>
    </div>
  );
};

const Post = () => {
  const data = [
    { title: "title1", body: "body", footer: "footer" },
    { title: "title2", body: "body", footer: "footer" },
    { title: "title3", body: "body", footer: "footer" }
  ];
  const postList = data.map((post, index) => {
    const { title, body, footer } = post;
    return <PostItem title={title} body={body} footer={footer} key={index} />;
  });
  return <div className="posthWrap">{postList}</div>;
};

export default Post;
