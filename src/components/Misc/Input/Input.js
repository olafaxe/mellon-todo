import React from "react";

const Input = ({ label, id, getDataFu, def }) => {
  return (
    <>
      <label htmlFor={label}>
        <input
          onChange={getDataFu}
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
