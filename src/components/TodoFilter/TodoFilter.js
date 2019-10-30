import React from "react";
import "./TodoFilter.scss";

const TodoFilter = ({ filterHandleFu }) => {
  return (
    <div className="container__filter">
      <div onClick={filterHandleFu} className="filter__container">
        <div className="filter--content">
          <p>All</p>
        </div>
        <div className="filter--content">
          <p>Easy</p>
        </div>
        <div className="filter--content">
          <p>Hard</p>
        </div>
        <div className="filter--content">
          <p>Complete</p>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
