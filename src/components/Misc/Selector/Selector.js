import React from "react";

const Selector = ({ label, id, getDifficultyFu }) => {
  return (
    <>
      <label htmlFor={label}></label>
      <select onChange={getDifficultyFu} id={id}>
        <option>EASY</option>
        <option>HARD</option>
      </select>
    </>
  );
};

export default Selector;
