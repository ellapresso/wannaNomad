import React, { Component } from "react";
import { Container } from "next/app";
import Head from "next/head";
// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import FooterContainer from "../containers/common/FooterContainer";
// css
import "antd/dist/antd.css";
import "../static/style/common.css";

interface Props {
  Component: any;
  pageProps: any;
}

export default class MyApp extends Component<Props> {
  constructor(props) {
    super(props);
    // console.warn("마이앱의 컨스트럭터.", props);
  }

  componentDidMount() {
    // console.warn("마이앱의 컴포넌트 디드 마운트.");
  }

  static async getInitialProps({ Component, router, ctx }) {
    // console.warn("마이앱의 겟 이니셜.", router);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // console.warn("받은 props.", pageProps);

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          />
        </Head>
        <HeaderContainer />
        <Component {...pageProps} />
        <FooterContainer />
      </Container>
    );
  }
}
