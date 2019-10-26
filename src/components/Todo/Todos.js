import React from "react";
import Todo from "./Todo";
import "./Todo.scss";

const Todos = ({
  todo,
  selectedFilter,
  removeHandle,
  confirmRemove,
  editHandle,
  confirmEdit,
  checkHandle,
  getData,
  inputOld,
  wall
}) => {
  return (
    <>
      {todo.map(todo => {
        if (selectedFilter === "ALL") {
          return (
            <Todo
              removeHandle={removeHandle}
              confirmRemove={confirmRemove}
              willRemove={todo.delete}
              editHandle={editHandle}
              canEdit={todo.edit}
              confirmEdit={confirmEdit}
              checkHandle={checkHandle}
              key={todo.id.toString()}
              id={todo.id}
              content={todo.content}
              checkValue={todo.checked}
              getData={getData}
              inputOld={inputOld}
              wall={wall}
            ></Todo>
          );
        } else if (todo.filter === selectedFilter) {
          return (
            <Todo
              removeHandle={removeHandle}
              confirmRemove={confirmRemove}
              willRemove={todo.delete}
              editHandle={editHandle}
              canEdit={todo.edit}
              confirmEdit={confirmEdit}
              checkHandle={checkHandle}
              key={todo.id.toString()}
              id={todo.id}
              content={todo.content}
              checkValue={todo.checked}
              getData={getData}
              inputOld={inputOld}
              wall={wall}
            ></Todo>
          );
        }
      })}
    </>
  );
};

export default Todos;
