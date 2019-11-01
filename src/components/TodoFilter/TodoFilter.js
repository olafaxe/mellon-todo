import React from "react";
import TodoFilterItem from "../TodoFilterItem/TodoFilterItem";
import "./TodoFilter.scss";

const TodoFilter = ({ getFilter, avaibleFilters }) => {
  return (
    <div className="container__filter">
      <div className="filter__container">
        {avaibleFilters.map(item => {
          return (
            <TodoFilterItem
              getFilter={() => getFilter(item)}
              key={item.filter.toString()}
              filter={item.filter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoFilter;
