import React from "react";
import Todo from "./Todo";
import "./Todo.scss";

const Todos = ({
  todo,
  selectedFilter,
  remove,
  editHandle,
  canEdit,
  confirmEdit,
  checkHandle,
  getData,
  inputOld,
  wall = { wall }
}) => {
  return (
    <>
      {todo.map(todo => {
        if (selectedFilter === "ALL") {
          return (
            <Todo
              remove={remove}
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
          console.log(selectedFilter);
          return (
            <Todo
              remove={remove}
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
