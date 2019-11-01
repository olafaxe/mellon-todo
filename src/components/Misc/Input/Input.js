import React from "react";

const Input = ({ label, id, getDataFromInput, def }) => {
  return (
    <>
      <input
        onChange={getDataFromInput}
        id={id}
        type={"text"}
        maxLength={40}
        value={def}
      ></input>
    </>
  );
};

export default Input;
