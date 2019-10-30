import React from "react";

const TodoEdit = ({ todoid, editFunction, stylingClass }) => {
  return <i onClick={editFunction} id={todoid} className={stylingClass}></i>;
};

export default TodoEdit;
