import React from "react";
import mellon from "../../images/mellon.png";

import "./Mellon.scss";

const MellonTitle = () => {
  return (
    <div className="container__title">
      <img className="title--image" src={mellon}></img>
    </div>
  );
};

export default MellonTitle;
