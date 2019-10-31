import React from "react";

const Input = ({ label, id, getDataFromInput, def }) => {
  return (
    <>
      <label htmlFor={label}>
        <input
          onChange={getDataFromInput}
          id={id}
          type={"text"}
          maxLength={40}
          value={def}
        ></input>
      </label>
    </>
  );
};

export default Input;
