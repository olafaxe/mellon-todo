import React from "react";

const Selector = ({ label, id, getDataFromSelector, avaibleFilters }) => {
  let filterdFilters = avaibleFilters.filter(filter => !filter.default);
  return (
    <>
      <label htmlFor={label}></label>
      <select onChange={getDataFromSelector} id={id}>
        {filterdFilters.map(filter => {
          return (
            <option key={filter.filter} value={filter.filter}>
              {filter.filter}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Selector;
