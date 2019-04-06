//커스텀 에러 처리
import React from "react";

interface Props {
  statusCode: Number;
}

export default class Error extends React.Component<Props> {
  static getInitialProps({ res, jsonPageRes }) {
    const statusCode = res
      ? res.statusCode
      : jsonPageRes
      ? jsonPageRes.status
      : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
}
