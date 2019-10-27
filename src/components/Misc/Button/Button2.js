import React from "react";

const Button2 = e => {
  const mouse = e => {
    e.preventDefault();
    console.log("mouse enter");
  };

  return <div onMouseEnter={mouse}>Hover on me</div>;
};

export default Button2;
