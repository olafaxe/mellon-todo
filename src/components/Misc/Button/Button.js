import React from "react";

import "./Hover.scss";

const Button = ({ buttonAction, type, todoId, value, btncls }) => {
  return (
    <>
      <button className={`${btncls}`} onClick={buttonAction}>
        <p value={value} id={todoId}>
          {type}
        </p>
      </button>
    </>
  );
};

export default Button;
