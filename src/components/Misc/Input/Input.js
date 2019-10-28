import React from "react";

const Input = ({ label, id, type, getDataFu, def }) => {
  return (
    <>
      <label htmlFor={label}>
        <input
          onChange={getDataFu}
          id={id}
          type={type}
          maxLength={40}
          defaultValue={def}
        ></input>
      </label>
    </>
  );
};

export default Input;
