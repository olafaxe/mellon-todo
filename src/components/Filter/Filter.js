import React from "react";
import "./Filter.scss";

const Filter = ({ chosenFilter }) => {
  return (
    <div className="container__filter">
      <div className="filter__container">
        <select onChange={chosenFilter}>
          <option>All</option>
          <option>Easy</option>
          <option>Hard</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
