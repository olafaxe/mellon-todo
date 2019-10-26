import React from "react";
import mellon from "../../images/mellon.png";

import "./Title.scss";

const Title = () => {
  return (
    <div className="container__title">
      <img className="title--image" src={mellon}></img>
    </div>
  );
};

export default Title;
