import { withRouter } from "next/router";

const About = withRouter(({ router }) => {
  console.log(typeof router);
  return <div>{router.pathname}</div>;
});

export default About;
