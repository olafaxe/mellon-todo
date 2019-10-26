import React from "react";
import "./Filter.scss";

const Filter = ({ filterHandleFu }) => {
  return (
    <div className="container__filter">
      <div className="filter__container">
        <select onChange={filterHandleFu}>
          <option>All</option>
          <option>Easy</option>
          <option>Hard</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
