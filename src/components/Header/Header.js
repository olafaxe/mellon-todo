import React from "react";
import mellon from "../../images/mellon.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className="container__title">
      <img className="title--image" src={mellon} alt="Title"></img>
    </div>
  );
};

export default Header;
