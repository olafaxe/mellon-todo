import React from "react";

const TodoFilterItem = ({ getFilter, filter, canRemoveFilter }) => {
  return (
    <div onClick={getFilter} className="filter--content">
      <p>{filter}</p>
    </div>
  );
};

export default TodoFilterItem;

//onClick={confirmingRemoveFilter}
