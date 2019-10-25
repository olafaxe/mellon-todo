import React from "react";
import "./Content.scss";

const Content = props => {
  return <div className="container__content">{props.children}</div>;
};

export default Content;
