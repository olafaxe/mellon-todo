import React from "react";

const Button = ({ addHandler, type }) => {
  return (
    <>
      <button onClick={addHandler}>{type}</button>
    </>
  );
};

export default Button;
