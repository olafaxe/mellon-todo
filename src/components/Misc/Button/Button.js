import React, { useState } from "react";

import "./Hover.scss";

const Button = ({ handlerFu, type, todoId, value, btncls }) => {
  const [hover, setHover] = useState(null);

  const mouseEnter = e => {
    e.stopPropagation();
    if (e.target.classList.contains("delete")) {
      setHover("hover-del");
    } else if (e.target.classList.contains("undefined")) {
      setHover("hover-add");
    }
  };
  const mouseLeave = e => {
    e.stopPropagation();
    setHover("nohover");
  };

  return (
    <>
      <button
        className={`${hover} ${btncls}`}
        onMouseEnter={mouseEnter}
        onMouseOver={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={handlerFu}
      >
        <p value={value} id={todoId}>
          {type}
        </p>
      </button>
    </>
  );
};

export default Button;
