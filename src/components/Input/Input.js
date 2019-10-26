import React from "react";

const Input = ({ label, id, type, getData, def }) => {
  return (
    <>
      <label htmlFor={label}>
        <input
          onChange={getData}
          id={id}
          type={type}
          maxLength={30}
          value={def}
        ></input>
      </label>
    </>
  );
};

export default Input;
