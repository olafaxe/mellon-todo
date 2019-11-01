import React from "react";

const TodoFilterItem = ({ selectFunction, filter }) => {
  return (
    <div onClick={selectFunction} className="filter--content">
      <p>{filter}</p>
    </div>
  );
};

export default TodoFilterItem;
