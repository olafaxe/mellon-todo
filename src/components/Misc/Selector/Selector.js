import React from "react";

const Selector = ({ label, id, choosingDifficulty }) => {
  return (
    <>
      <label htmlFor={label}></label>
      <select onChange={choosingDifficulty} id={id}>
        <option>EASY</option>
        <option>HARD</option>
      </select>
    </>
  );
};

export default Selector;
