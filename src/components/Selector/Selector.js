import React from "react";

const Selector = ({ label, id, getDifficulty }) => {
  return (
    <>
      <label htmlFor={label}></label>
      <select onChange={getDifficulty} id={id}>
        <option>EASY</option>
        <option>HARD</option>
      </select>
    </>
  );
};

export default Selector;
