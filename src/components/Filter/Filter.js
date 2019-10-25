import React from "react";

const Filter = ({ chosenFilter }) => {
  return (
    <>
      <select onChange={chosenFilter}>
        <option>Alla</option>
        <option>Lätt</option>
      </select>
    </>
  );
};

export default Filter;
