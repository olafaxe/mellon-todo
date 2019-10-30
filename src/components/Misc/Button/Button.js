import React from "react";

import "./Hover.scss";

const Button = ({ handlerFu, type, todoId, value, btncls }) => {
  return (
    <>
      <button className={`${btncls}`} onClick={handlerFu}>
        <p value={value} id={todoId}>
          {type}
        </p>
      </button>
    </>
  );
};

export default Button;
