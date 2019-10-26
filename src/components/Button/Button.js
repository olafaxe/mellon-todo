import React from "react";

const Button = ({ handler, type, id, value }) => {
  return (
    <>
      <button onClick={handler}>
        <p value={value} id={id}>
          {type}
        </p>
      </button>
    </>
  );
};

export default Button;
