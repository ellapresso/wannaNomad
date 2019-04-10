import React, { Component } from "react";
import { Container } from "next/app";
// css
import "antd/dist/antd.css";
import "../static/style/common.css";

interface Props {
  Component: any;
  pageProps: any;
}

export default class MyApp extends Component<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
