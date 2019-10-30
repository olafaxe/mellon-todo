import React from "react";
import "./TodoFilter.scss";

const TodoFilter = ({ filterHandleFu }) => {
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

export default TodoFilter;
