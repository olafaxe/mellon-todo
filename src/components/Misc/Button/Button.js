import React from "react";

const Button = ({ handlerFu, type, todoId, value }) => {
  return (
    <>
      <button onClick={handlerFu}>
        <p value={value} id={todoId}>
          {type}
        </p>
      </button>
    </>
  );
};

export default Button;
